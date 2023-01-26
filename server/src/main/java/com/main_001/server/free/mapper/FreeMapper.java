package com.main_001.server.free.mapper;

import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.entity.FreeLike;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FreeMapper {
    Free freeBoardPostToFree(FreeDto.PostFreeBoard postFreeBoard);
    Free freeBoardPatchToFree(FreeDto.PatchFreeBoard patchFreeBoard);
    FreeComment commentPostToFreeComment(FreeDto.PostComment postComment);
    FreeComment commentPatchToFreeComment(FreeDto.PatchComment patchComment);
    FreeLike freeLikeDtoToFreeLike(FreeDto.Like freeLikeDto);
    FreeDto.Response FreeToFreeResponseDto(Free free);
    List<FreeDto.Response> FreeToFreeMultiResponseDto(List<Free> free);
    FreeDto.Response FreeToFreeCommentResponseDto(FreeComment freeComment);
    List<FreeDto.Like> freeLikesToFreeLikeResponseDtos(List<FreeLike> freeLike);
    List<FreeDto.Response> FreeToFreeCommentMultiResponseDto(List<FreeComment> freeComment);

}
