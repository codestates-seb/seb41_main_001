package com.main_001.server.free.mapper;

import com.main_001.server.free.dto.FreeCommentDto;
import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.dto.ResponseDto;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.entity.FreeLike;
import com.main_001.server.free.entity.FreeTag;
import com.main_001.server.member.entity.Member;
import com.main_001.server.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface FreeMapper {
    default Free freeBoardPostToFree(FreeDto.PostFreeBoard postFreeBoard) {
        Free free = new Free();
        Member member = new Member();
        List<FreeTag> freeTags = postFreeBoard.getFreeTagDtos().stream()
                .map(freeTagDto -> {
                    FreeTag freeTag = new FreeTag();
                    Tag tag = new Tag();
                    tag.setTagId(freeTagDto.getTagId());
                    tag.setTagName(freeTagDto.getTagName());
                    tag.setEmoji(freeTagDto.getEmoji());
                    freeTag.setFree(free);
                    freeTag.setTag(tag);
                    return freeTag;
                }).collect(Collectors.toList());
        member.setMemberId(postFreeBoard.getMemberId());
        free.setFreeTitle(postFreeBoard.getFreeTitle());
        free.setFreeBody(postFreeBoard.getFreeBody());
        free.setCategory(postFreeBoard.getCategory());
        free.setFreeTags(freeTags);
        free.setMember(member);
        return free;
    }

    default Free freeBoardPatchToFree(FreeDto.PatchFreeBoard patchFreeBoard) {
        if (patchFreeBoard == null) return null;
        Free free = new Free();
        Member member = new Member();
        member.setMemberId(patchFreeBoard.getMemberId());
        free.setMember(member);
        free.setFreeTitle(patchFreeBoard.getFreeTitle());
        free.setFreeBody(patchFreeBoard.getFreeBody());
        free.setCategory(patchFreeBoard.getCategory());
        return free;
    }

    default FreeDto.Response freeToFreeResponseDto(Free free) {
        List<FreeTag> freeTags = free.getFreeTags();
        List<FreeComment> freeComments = free.getFreeComments();
        List<FreeLike> freeLikes = free.getFreeLikes();

        return FreeDto.Response.builder()
                .freeId(free.getFreeId())
                .freeTitle(free.getFreeTitle())
                .freeBody(free.getFreeBody())
                .createdAt(free.getCreatedAt())
                .modifiedAt(free.getModifiedAt())
                .freeTags(freeTagsToFreeTagResponseDtos(freeTags))
                .freeLikes(freeLikesToFreeLikeResponseDtos(freeLikes))
                .freeComments(freeCommentsToFreeCommentResponseDtos(freeComments))
                .views(free.getViews())
                .memberId(free.getMember().getMemberId())
                .category(free.getCategory())
                .build();
    }

    List<FreeDto.Response> freesToFreeResponseDtos(List<Free> free);

    default FreeLike freeLikeDtoToFreeLike(FreeDto.Like freeLikeDto) {
        Member member = new Member();
        member.setMemberId(freeLikeDto.getMemberId());
        return FreeLike.builder()
                .member(member)
                .build();
    }

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

    default List<ResponseDto.FreeComment> freeCommentsToFreeCommentResponseDtos(List<FreeComment> freeComments){
        return freeComments
                .stream()
                .map(freeComment -> ResponseDto.FreeComment
                        .builder()
                        .freeId(freeComment.getFree().getFreeId())
                        .freeCommentId(freeComment.getCommentId())
                        .memberId(freeComment.getMember().getMemberId())
                        .nickname(freeComment.getMember().getNickname())
                        .heart(freeComment.getMember().getHeart())
                        .body(freeComment.getCommentBody())
                        .createdAt(freeComment.getCreatedAt())
                        .modifiedAt(freeComment.getModifiedAt())
                        .build())
                .collect(Collectors.toList());
    }

    default List<ResponseDto.FreeTag> freeTagsToFreeTagResponseDtos(List<FreeTag> freeTags) {
        return freeTags
                .stream()
                .map(freeTag -> ResponseDto.FreeTag
                        .builder()
                        .tagId(freeTag.getTag().getTagId())
                        .tagName(freeTag.getTag().getTagName())
                        .emoji(freeTag.getTag().getEmoji())
                        .build())
                .collect(Collectors.toList());
    }

    default List<ResponseDto.FreeLike> freeLikesToFreeLikeResponseDtos(List<FreeLike> freeLikes){
        return freeLikes
                .stream()
                .map(freeLike -> ResponseDto.FreeLike
                        .builder()
                        .memberId(freeLike.getMember().getMemberId())
                        .build())
                .collect(Collectors.toList());
    }
}
