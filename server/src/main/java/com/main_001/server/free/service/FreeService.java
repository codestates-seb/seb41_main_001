package com.main_001.server.free.service;

import com.main_001.server.exception.BusinessLogicException;
import com.main_001.server.exception.ExceptionCode;
import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.entity.FreeLike;
import com.main_001.server.free.repositpry.FreeCommentRepository;
import com.main_001.server.free.repositpry.FreeLikeRepository;
import com.main_001.server.free.repositpry.FreeRepository;
import com.main_001.server.member.repository.MemberRepository;
import com.main_001.server.member.service.MemberService;
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

    public FreeService(FreeRepository freeRepository, FreeCommentRepository freeCommentRepository, FreeLikeRepository freeLikeRepository, MemberService memberService, MemberRepository memberRepository) {
        this.freeRepository = freeRepository;
        this.freeCommentRepository = freeCommentRepository;
        this.freeLikeRepository = freeLikeRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }
    //Todo
    public Free createFreeBoard(Free free) {
        memberService.findMember(free.getMember().getMemberId());
        return freeRepository.save(free);
    }


    //Todo : null 입력이 주어졌을 때 조건문으로 처리
    public Free updateFreeBoard(long freeId, FreeDto.PatchFreeBoard patchFreeBoardDto) {
        Free findFree = findVerifiedFreeBoard(freeId);
        findFree.setFreeBody(patchFreeBoardDto.getFreeBody());
        findFree.setFreeTitle(patchFreeBoardDto.getFreeTitle());
        findFree.setCategory(patchFreeBoardDto.getCategory());
        return freeRepository.save(findFree);
    }

    //Todo
    public void deleteFreeBoard(long freeId, long memberId) {
        memberService.findMember(memberId);
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

    //Todo
    public Free findFreeBoard(long freeId) {
        return freeRepository.findByFreeId(freeId);
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
}
