package com.main_001.server.free.service;

import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.repositpry.FreeCommentReposittory;
import com.main_001.server.free.repositpry.FreeRepository;
import com.main_001.server.member.repository.MemberRepository;
import com.main_001.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FreeService{
    private final FreeRepository freeRepository;
    private final FreeCommentReposittory freeCommentReposittory;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    public Free createFreeboard(Free free) {
        memberService.findMember(free.getMember().getMemberId());
        return freeRepository.save(free);
    }

    public Free updateFreeboard(Free free, FreeDto.PatchFreeboard patchFreeboardDto) {
        Free findFree = findVerifiedFreeboard(free.getFreeId());//BusinessLogicException 코드 수정 이후 freeboard가 없으면 경고주는 용도
        free.setFreeBody(patchFreeboardDto.getFreeBody());
        free.setFreeTitle(patchFreeboardDto.getFreeTitle());
        free.setCategory(patchFreeboardDto.getCategory());
        return free;
    }

    public void deleteFreeboard(long freeId, long memberId) {
        memberService.findMember(memberId);
        freeRepository.deleteById(freeId);
    }

    public void updateLike(long freeId, long memberId) {
//        memberService.findMember(memberId);
    }

    public FreeComment createFreeComment(FreeComment freeComment) {
        memberService.findMember(freeComment.getMember().getMemberId());
        return freeCommentReposittory.save(freeComment);
    }

    public FreeComment updateFreeComment(FreeComment freeComment) {
        findVerifiedFreeboard(freeComment.getFreeId());
        freeComment.setCommentBody(freeComment.getCommentBody());
        return freeComment;
    }

    public void deleteFreeComment(FreeComment freeComment) {
        memberService.findMember(freeComment.getMember().getMemberId());
        freeCommentReposittory.deleteById(freeComment.getCommentId());
    }

    public Free findFreeboard(long freeId) {
        return freeRepository.findByFreeId(freeId);
    }

    public FreeComment findFreeComment(long commentId) {
        return freeCommentReposittory.findFreeCommentByCommentId(commentId);
    }

    public Page<Free> findFreeboards(int page, int size) {
        return freeRepository.findAll(PageRequest.of(page, size,
                Sort.by("freeId").descending()));
    }

    public Page<Free> searchFreeboards(int page, int size, String string) {
        return null;
    }
    public Free findVerifiedFreeboard(long freeId){
        Optional<Free> optionalFreeboard = freeRepository.findById(freeId);
        Free free = optionalFreeboard.orElseThrow();
        return free;
    }
}
