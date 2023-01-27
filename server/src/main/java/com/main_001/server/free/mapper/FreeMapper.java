package com.main_001.server.free.mapper;

import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.dto.ResponseDto;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.entity.FreeLike;
import com.main_001.server.free.entity.FreeTag;
import com.main_001.server.member.entity.Member;
import com.main_001.server.tag.entity.Tag;
import io.swagger.annotations.ApiModelProperty;
import org.mapstruct.Mapper;

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

    FreeComment commentPostToFreeComment(FreeDto.PostComment postComment);

    FreeComment commentPatchToFreeComment(FreeDto.PatchComment patchComment);

    FreeLike freeLikeDtoToFreeLike(FreeDto.Like freeLikeDto);

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
//                .freeLikes(freeLikes -> mapper로 response로 변환)
//                .freeComments(freeComments -> mapper로 response로 변환)
                .views(free.getViews())
                .memberId(free.getMember().getMemberId())
                .category(free.getCategory())
                .build();
    }

    List<FreeDto.Response> freesToFreeResponseDtos(List<Free> free);

    FreeDto.Response freeToFreeCommentResponseDto(FreeComment freeComment);

    List<FreeDto.Like> freeLikesToFreeLikeResponseDtos(List<FreeLike> freeLike);

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

}
