package com.main_001.server.free.mapper;

import com.main_001.server.free.dto.FreeCommentDto;
import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.entity.FreeLike;
import com.main_001.server.member.entity.Member;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface FreeMapper {
    Free freeBoardPostToFree(FreeDto.PostFreeBoard postFreeBoard);
    Free freeBoardPatchToFree(FreeDto.PatchFreeBoard patchFreeBoard);
    default FreeComment commentPostToFreeComment(FreeCommentDto.Default postComment) {
        Member member = new Member();
        member.setMemberId(postComment.getMemberId());
        return FreeComment.builder()
                .commentBody(postComment.getCommentBody())
                .modifiedAt(LocalDateTime.now())
                .member(member)
                .build();
    }
    default FreeComment commentPatchToFreeComment(FreeCommentDto.Default patchComment) {
        Member member = new Member();
        member.setMemberId(patchComment.getMemberId());
        return FreeComment.builder()
                .commentBody(patchComment.getCommentBody())
                .modifiedAt(LocalDateTime.now())
                .member(member)
                .build();
    }
    default FreeLike freeLikeDtoToFreeLike(FreeDto.Like freeLikeDto) {
        Member member = new Member();
        member.setMemberId(freeLikeDto.getMemberId());
        return FreeLike.builder()
                .member(member)
                .build();
    }
    FreeDto.Response FreeToFreeResponseDto(Free free);
    List<FreeDto.Response> FreesToFreeResponseDtos(List<Free> free);
    FreeDto.Response FreeToFreeCommentResponseDto(FreeComment freeComment);
    List<FreeDto.Like> freeLikesToFreeLikeResponseDtos(List<FreeLike> freeLike);

}
