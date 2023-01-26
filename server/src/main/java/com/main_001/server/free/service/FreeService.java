package com.main_001.server.free.service;

import com.main_001.server.exception.BusinessLogicException;
import com.main_001.server.exception.ExceptionCode;
import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.entity.FreeLike;
import com.main_001.server.free.repositpry.FreeCommentReposittory;
import com.main_001.server.free.repositpry.FreeLikeRepository;
import com.main_001.server.free.repositpry.FreeRepository;
import com.main_001.server.member.repository.MemberRepository;
import com.main_001.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FreeService{
    private final FreeRepository freeRepository;
    private final FreeCommentReposittory freeCommentReposittory;
    private final FreeLikeRepository freeLikeRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    public Free createFreeBoard(Free free) {
        memberService.findMember(free.getMember().getMemberId());
        return freeRepository.save(free);
    }

    public Free updateFreeBoard(Free free, FreeDto.PatchFreeBoard patchFreeBoardDto) {
        Free findFree = findVerifiedFreeBoard(free.getFreeId());//BusinessLogicException 코드 수정 이후 freeboard가 없으면 경고주는 용도
        free.setFreeBody(patchFreeBoardDto.getFreeBody());
        free.setFreeTitle(patchFreeBoardDto.getFreeTitle());
        free.setCategory(patchFreeBoardDto.getCategory());
        return free;
    }

    public void deleteFreeBoard(long freeId, long memberId) {
        memberService.findMember(memberId);
        freeRepository.deleteById(freeId);
    }

    public Free updateLike(long FreeId, FreeLike freeLike) {
        Free findFree = findVerifiedFreeBoard(FreeId);
        long FreeLikeMemberId = freeLike.getMember().getMemberId();
        long count = findFree.getFreeLikes().stream()
                .filter(rc -> Objects.equals(rc.getMember().getMemberId(), FreeLikeMemberId))
                .count();
        if(count==0) freeLike.setFree(findFree);
        else {
            findFree.getFreeLikes().removeIf(rl -> Objects.equals(rl.getMember().getMemberId(), freeLike.getMember().getMemberId()));
            freeLikeRepository.deleteFreeLikeByMember_MemberIdAndFree_FreeId(FreeLikeMemberId,FreeId);
        }
        return freeRepository.save(findFree);
    }

    public FreeComment createFreeComment(FreeComment freeComment) {
        memberService.findMember(freeComment.getMember().getMemberId());
        return freeCommentReposittory.save(freeComment);
    }

    public FreeComment updateFreeComment(long freeId, long commentId, FreeDto.PatchComment patchCommentDto) {
        FreeComment freeComment = findFreeComment(freeId, commentId);
        freeComment.setCommentBody(patchCommentDto.getCommentBody());
        return freeComment;
    }

    public void deleteFreeComment(FreeComment freeComment) {
        memberService.findMember(freeComment.getMember().getMemberId());
        freeCommentReposittory.deleteById(freeComment.getCommentId());
    }

    public Free findFreeBoard(long freeId) {
        return freeRepository.findByFreeId(freeId);
    }

    public FreeComment findFreeComment(long freeId, long commentId) {
        return freeCommentReposittory.findFreeCommentByFreeIdAndCommentId(freeId, commentId);
    }

    public Page<Free> findFreeBoards(int page, int size, FreeDto.Search search) {
        Page<Free> result = null;
        switch(search.getType()) {
            case "tag" : result = freeRepository.findAll(PageRequest.of(page, size,
                    Sort.by(search.getKeyword()).descending()));
            case "category" : result =  freeRepository.findAll(PageRequest.of(page, size,
                    Sort.by(search.getKeyword()).descending()));
            case "keyword" : result =  freeRepository.findAll(PageRequest.of(page, size,
                    Sort.by(search.getKeyword()).descending()));
        }
        return result;
    }

    public Page<Free> searchFreeBoards(int page, int size, String string) {
        return null;
    }
    public Free findVerifiedFreeBoard(long freeId){
        Optional<Free> optionalFreeBoard = freeRepository.findById(freeId);
        Free free = optionalFreeBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.FREEBOARD_NOT_FOUND));
        return free;
    }
}
