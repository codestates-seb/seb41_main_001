package com.main_001.server.free.mapper;

import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FreeMapper {
    Free freeboardPostToFree(FreeDto.PostFreeboard postFreeboard);
    Free freeboardPachToFree(FreeDto.PatchFreeboard patchFreeboard);
    FreeComment commentPostToFreeComment(FreeDto.PostComment postComment);
    FreeComment commentPatchToFreeComment(FreeDto.PatchComment patchComment);
    FreeDto.Response FreeToFreeResponseDto(Free free);
    List<FreeDto.Response> FreeToFreeMultiRespnseDto(List<Free> free);
    FreeDto.Response FreeToFreeCommentResponseDto(FreeComment freeComment);
    List<FreeDto.Response> FreeToFreeCommentMultiRespnseDto(List<FreeComment> freeComment);

}
