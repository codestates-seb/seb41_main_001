package com.main_001.server.free.service;

import com.main_001.server.auth.utils.RedisUtils;
import com.main_001.server.exception.BusinessLogicException;
import com.main_001.server.exception.ExceptionCode;
import com.main_001.server.file.S3Service;
import com.main_001.server.file.UploadFile;
import com.main_001.server.free.entity.*;
import com.main_001.server.free.repository.FreeCommentRepository;
import com.main_001.server.free.repository.FreeImageRepository;
import com.main_001.server.free.repository.FreeLikeRepository;
import com.main_001.server.free.repository.FreeRepository;
import com.main_001.server.member.entity.Member;
import com.main_001.server.member.repository.MemberRepository;
import com.main_001.server.member.service.MemberService;
import com.main_001.server.tag.entity.Tag;
import com.main_001.server.tag.repository.TagRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class FreeService {
    private final FreeRepository freeRepository;
    private final FreeCommentRepository freeCommentRepository;
    private final FreeLikeRepository freeLikeRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;
    private final RedisUtils redisUtils;
    private final S3Service s3Service;
    private final FreeImageRepository freeImageRepository;

    public FreeService(FreeRepository freeRepository, FreeCommentRepository freeCommentRepository, FreeLikeRepository freeLikeRepository, MemberService memberService, MemberRepository memberRepository,
                       TagRepository tagRepository,
                       RedisUtils redisUtils,
                       S3Service s3Service,
                       FreeImageRepository freeImageRepository) {
        this.freeRepository = freeRepository;
        this.freeCommentRepository = freeCommentRepository;
        this.freeLikeRepository = freeLikeRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.tagRepository = tagRepository;
        this.redisUtils = redisUtils;
        this.s3Service = s3Service;
        this.freeImageRepository = freeImageRepository;
    }

    public Free createFreeBoard(Free free, List<MultipartFile> files) {
        Long memberId = free.getMember().getMemberId();
        verifyFree(free);
        free.setCreatedAt(LocalDateTime.now());
        free.setModifiedAt(LocalDateTime.now());
        free.setMember(memberRepository.findById(memberId).orElseThrow());
        for (FreeTag freeTag : free.getFreeTags()) {
            Optional<Tag> optionalTag = tagRepository.findByTagName(freeTag.getTag().getTagName());
            Tag tag;
            if(optionalTag.isEmpty()) {
                tag = tagRepository.save(Tag.builder().tagName(freeTag.getTag().getTagName()).emoji(freeTag.getTag().getEmoji()).build());
            } else {
                tag = optionalTag.orElseThrow();
            }
            freeTag.setTag(tag);
            tag.setFreeCount(tag.getFreeCount() + 1);
            tagRepository.save(tag);
        }

        if (files != null) {
            List<FreeImage> freeImages = new ArrayList<>();
            addFreeImages(free, freeImages, files);
        }

        Member findMember = memberRepository.findById(memberId).orElseThrow();
        findMember.setHeart(findMember.getHeart() + 5);
        memberRepository.save(findMember);
        return saveFree(free);
    }

    public Free updateFreeBoard(long freeId, Free free, List<MultipartFile> files, List<String> removeImages) {
        Free findFree = findVerifiedFreeBoard(freeId);
        if (!Objects.equals(findFree.getMember().getMemberId(), free.getMember().getMemberId()))
            throw new BusinessLogicException(ExceptionCode.FREEBOARD_MODIFY_DENIED);
        if (free.getFreeBody() != null) findFree.setFreeBody(free.getFreeBody());
        if (free.getFreeTitle() != null) findFree.setFreeTitle(free.getFreeTitle());
        if (free.getCategory() != null) findFree.setCategory(free.getCategory());

        if (removeImages != null) {
            List<FreeImage> tempFreeImages = new ArrayList<>();
            for (FreeImage freeImage : findFree.getFreeImages()) {
                if (!removeImages.contains(freeImage.getStoredFileName())) {
                    tempFreeImages.add(freeImage);
                }
            }
            s3Service.deleteImages(removeImages);
            findFree.setFreeImages(null);
            removeImages.forEach(freeImageRepository::deleteByStoredFileName);
            if (!tempFreeImages.isEmpty())
                findFree.setFreeImages(tempFreeImages);
        }

        if (files != null) {
            if (findFree.getFreeImages() == null)
                findFree.setFreeImages(new ArrayList<>());
            addFreeImages(findFree, findFree.getFreeImages(), files);
        }

        return saveFree(findFree);
    }

    public void deleteFreeBoard(long freeId, long memberId) {
        Free findFree = findVerifiedFreeBoard(freeId);
        if (findFree.getMember().getMemberId() != memberId)
            throw new BusinessLogicException(ExceptionCode.FREEBOARD_MODIFY_DENIED);
        for (FreeTag freeTag : findFree.getFreeTags()) {
            Tag tag = tagRepository.findById(freeTag.getTag().getTagId()).orElseThrow();
            int tagCnt = tag.getFreeCount();
            tag.setFreeCount(tagCnt > 1 ? tagCnt - 1 : 0);
            tagRepository.save(tag);
        }
        Member findMember = memberRepository.findById(memberId).orElseThrow();
        findMember.setHeart(findMember.getHeart()-5);
        memberRepository.save(findMember);
        freeRepository.deleteById(freeId);
    }

    public Free updateLike(long FreeId, FreeLike freeLike) {
        Free findFree = findVerifiedFreeBoard(FreeId);
        Member findMember = findFree.getMember();
        long freeLikeMemberId = freeLike.getMember().getMemberId();
        long count = findFree.getFreeLikes().stream()
                .filter(fl -> Objects.equals(fl.getMember().getMemberId(), freeLikeMemberId))
                .count();
        if (count == 0){
            freeLike.setFree(findFree);
            findMember.setHeart(findMember.getHeart()+1);
        }
        else {
            findFree.getFreeLikes().removeIf(fl -> Objects.equals(fl.getMember().getMemberId(), freeLike.getMember().getMemberId()));
            freeLikeRepository.deleteFreeLikeByMember_MemberIdAndFree_FreeId(freeLikeMemberId, FreeId);
            findMember.setHeart(findMember.getHeart()-1);
        }
        memberRepository.save(findMember);
        return freeRepository.save(findFree);
    }

    public Free createFreeComment(long freeId, FreeComment freeComment) {
        Long memberId = freeComment.getMember().getMemberId();
        Free findFree = findVerifiedFreeBoard(freeId);
        freeComment.setCreatedAt(LocalDateTime.now());
        freeComment.setFree(findFree);
        freeComment.setMember(memberRepository.findById(memberId).orElseThrow());
        Member findMember = memberRepository.findById(memberId).orElseThrow();
        findMember.setHeart(findMember.getHeart()+1);

        memberRepository.save(findMember);
        return freeRepository.save(findFree);
    }

    public Free updateFreeComment(long freeId, long commentId, FreeComment freeComment) {
        Free findFree = findVerifiedFreeBoard(freeId);
        FreeComment targetComment = freeCommentRepository.findById(commentId).orElseThrow();
        if (!Objects.equals(targetComment.getMember().getMemberId(), freeComment.getMember().getMemberId()))
            throw new BusinessLogicException(ExceptionCode.COMMENT_MODIFY_DENIED);
        targetComment.setModifiedAt(freeComment.getModifiedAt());
        targetComment.setBody(freeComment.getBody());

        return freeRepository.save(findFree);
    }

    public Free deleteFreeComment(long freeId, long commentId, long memberId) {
        Free findFree = findVerifiedFreeBoard(freeId);
        FreeComment targetComment = freeCommentRepository.findById(commentId).orElseThrow();
        if (targetComment.getMember().getMemberId() != memberId)
            throw new BusinessLogicException(ExceptionCode.COMMENT_DELETE_DENIED);
        freeCommentRepository.deleteById(commentId);

        Member findMember = targetComment.getMember();
        findMember.setHeart(findMember.getHeart() - 1);

        memberRepository.save(findMember);
        return freeRepository.save(findFree);
    }

    public Free findFreeBoard(long freeId) {
        Free findFree = findVerifiedFreeBoard(freeId);
        findFree.setViews(findFree.getViews() + 1);
        return saveFree(findFree);
    }

    public Page<Free> findFreeBoards(int page, int size, String type, String keyword) {
        List<Free> frees;
        switch (type) {
            case "tag":
                frees = freeRepository.findAll(Sort.by("createdAt").descending())
                        .stream()
                        .filter(free -> free.getFreeTags()
                                .stream()
                                .map(FreeTag::getTag)
                                .map(Tag::getTagName)
                                .anyMatch(tagName -> tagName.equals(keyword)))
                        .collect(Collectors.toList());
                break;
            case "category":
                frees = freeRepository.findAll(Sort.by("createdAt").descending())
                        .stream()
                        .filter(free -> free.getCategory().equals(keyword))
                        .collect(Collectors.toList());
                break;
            case "keyword":
                frees = freeRepository.findAllByFreeTitleContainingIgnoreCase(keyword)
                        .stream()
                        .filter(free -> free.getFreeTitle().contains(keyword))
                        .collect(Collectors.toList());
                break;
            default:
                frees = freeRepository.findAll(Sort.by("createdAt").descending());
                break;
        }

        PageRequest pageRequest = PageRequest.of(page, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), frees.size());

        return new PageImpl<>(frees.subList(start, end), pageRequest, frees.size());
    }

    private Free findVerifiedFreeBoard(long freeId) {
        Optional<Free> optionalFreeBoard = freeRepository.findByFreeId(freeId);
        return optionalFreeBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.FREEBOARD_NOT_FOUND));
    }

    private void addFreeImages(Free free, List<FreeImage> freeImages, List<MultipartFile> files) {
        List<UploadFile> uploadFiles = s3Service.uploadImages(files);

        uploadFiles.forEach(uploadFile -> {
            FreeImage freeImage = FreeImage.builder()
                    .originalFileName(uploadFile.getOriginalFileName())
                    .storedFileName(uploadFile.getStoredFileName())
                    .filePath(uploadFile.getFilePath())
                    .fileSize(uploadFile.getFileSize())
                    .build();
            freeImages.add(freeImage);
            freeImage.setFree(free);
        });
        free.setFreeImages(freeImages);
    }

    private void deleteFreeImages(List<String> storedFileNames) {
        for (String storedFileName : storedFileNames) {
            freeImageRepository.deleteByStoredFileName(storedFileName);
        }
    }

    private void verifyFree(Free free) {
        memberService.findMember(free.getMember().getMemberId());
    }

    private Free saveFree(Free free) {
        return freeRepository.save(free);
    }
}
