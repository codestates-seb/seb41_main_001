package com.main_001.server.free.service;

import com.main_001.server.exception.BusinessLogicException;
import com.main_001.server.exception.ExceptionCode;
import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.entity.FreeLike;
import com.main_001.server.free.entity.FreeTag;
import com.main_001.server.free.repositpry.FreeCommentRepository;
import com.main_001.server.free.repositpry.FreeLikeRepository;
import com.main_001.server.free.repositpry.FreeRepository;
import com.main_001.server.member.repository.MemberRepository;
import com.main_001.server.member.service.MemberService;
import com.main_001.server.recruit.repository.RecruitCommentRepository;
import com.main_001.server.tag.entity.Tag;
import com.main_001.server.tag.repository.TagRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class FreeService{
    private final FreeRepository freeRepository;

    private final FreeCommentRepository freeCommentRepository;
    private final FreeLikeRepository freeLikeRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;
    private final RecruitCommentRepository recruitCommentRepository;

    public FreeService(FreeRepository freeRepository, FreeCommentRepository freeCommentRepository, FreeLikeRepository freeLikeRepository, MemberService memberService, MemberRepository memberRepository,
                       TagRepository tagRepository,
                       RecruitCommentRepository recruitCommentRepository) {
        this.freeRepository = freeRepository;
        this.freeCommentRepository = freeCommentRepository;
        this.freeLikeRepository = freeLikeRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.tagRepository = tagRepository;
        this.recruitCommentRepository = recruitCommentRepository;
    }

    public Free createFreeBoard(Free free) {
        verifyFree(free);
        free.setCreatedAt(LocalDateTime.now());
        free.setModifiedAt(LocalDateTime.now());
        free.setMember(memberRepository.findById(free.getMember().getMemberId()).orElseThrow());
        for(FreeTag freeTag : free.getFreeTags()){
            Tag tag = tagRepository.findById(freeTag.getTag().getTagId()).orElseThrow();
            tag.setFreeCount(tag.getFreeCount()+1);
        }
        return saveFree(free);
    }


    public Free updateFreeBoard(long freeId, Free free) {
        Free findFree = findVerifiedFreeBoard(freeId);
        if(!Objects.equals(findFree.getMember().getMemberId(), free.getMember().getMemberId())) throw new BusinessLogicException(ExceptionCode.FREEBOARD_MODIFY_DENIED);
        if(free.getFreeBody()!=null) findFree.setFreeBody(free.getFreeBody());
        if(free.getFreeTitle()!=null) findFree.setFreeTitle(free.getFreeTitle());
        if(free.getCategory()!=null) findFree.setCategory(free.getCategory());
        return saveFree(findFree);
    }

    public void deleteFreeBoard(long freeId, long memberId) {
        Free findFree = findVerifiedFreeBoard(freeId);
        if(findFree.getMember().getMemberId()!=memberId) throw new BusinessLogicException(ExceptionCode.FREEBOARD_MODIFY_DENIED);
        freeRepository.deleteById(freeId);
    }

    public Free updateLike(long FreeId, FreeLike freeLike) {
        Free findFree = findVerifiedFreeBoard(FreeId);
        long freeLikeMemberId = freeLike.getMember().getMemberId();
        long count = findFree.getFreeLikes().stream()
                .filter(fl -> Objects.equals(fl.getMember().getMemberId(), freeLikeMemberId))
                .count();
        if(count==0) freeLike.setFree(findFree);
        else {
            findFree.getFreeLikes().removeIf(fl -> Objects.equals(fl.getMember().getMemberId(), freeLike.getMember().getMemberId()));
            freeLikeRepository.deleteFreeLikeByMember_MemberIdAndFree_FreeId(freeLikeMemberId,FreeId);
        }
        return freeRepository.save(findFree);
    }

    //Todo
    public Free createFreeComment(long freeId, FreeComment freeComment) {
        Free findFree = findVerifiedFreeBoard(freeId);
        freeComment.setCreatedAt(LocalDateTime.now());
        freeComment.setFree(findFree);

        return freeRepository.save(findFree);
    }

    //Todo
    public Free updateFreeComment(long freeId, long commentId, FreeComment freeComment) {
        Free findFree = findVerifiedFreeBoard(freeId);
        FreeComment targetComment = freeCommentRepository.findById(commentId).orElseThrow();
        if (!Objects.equals(targetComment.getMember().getMemberId(), freeComment.getMember().getMemberId())) throw new BusinessLogicException(ExceptionCode.COMMENT_MODIFY_DENIED);
        targetComment.setModifiedAt(freeComment.getModifiedAt());
        targetComment.setCommentBody(freeComment.getCommentBody());

        return freeRepository.save(findFree);
    }

    //Todo
    public void deleteFreeComment(long freeId, long commentId, long memberId) {
        Free findFree = findVerifiedFreeBoard(freeId);
        FreeComment targetComment = freeCommentRepository.findById(commentId).orElseThrow();
        if (targetComment.getMember().getMemberId() != memberId) throw new BusinessLogicException(ExceptionCode.COMMENT_DELETE_DENIED);
        freeCommentRepository.deleteById(commentId);

        freeRepository.save(findFree);
    }

    public Free findFreeBoard(long freeId) {
        Free findFree = findVerifiedFreeBoard(freeId);
        findFree.setViews(findFree.getViews()+1);
        return saveFree(findFree);
    }


    //Todo 아예 새로 작성
    public Page<Free> findFreeBoards(int page, int size, FreeDto.Search search) {
        Page<Free> result = null;
        switch(search.getType()) {
            case "tag" : result = freeRepository.findAll(PageRequest.of(page, size,
                    Sort.by(search.getKeyword()).descending()));
            case "category" : result = freeRepository.findAll(PageRequest.of(page, size,
                    Sort.by(search.getKeyword()).descending()));
            case "keyword" : result = freeRepository.findAll(PageRequest.of(page, size,
                    Sort.by(search.getKeyword()).descending()));
        }
        return result;
    }

    private Free findVerifiedFreeBoard(long freeId){
        Optional<Free> optionalFreeBoard = freeRepository.findById(freeId);
        return optionalFreeBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.FREEBOARD_NOT_FOUND));
    }

    private void verifyFree(Free free) {
        memberService.findMember(free.getMember().getMemberId());
    }

    private Free saveFree(Free free) {
        return freeRepository.save(free);
    }
}
