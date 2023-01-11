package com.main_001.server.free.mapper;

import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.entity.Free;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FreeMapper {
    Free freeboardPostToFree(FreeDto.PostFreeboard postFreeboard);
    Free freeboardPachToFree(FreeDto.PatchFreeboard patchFreeboard);
    Free commentPostToFree(FreeDto.PostComment postComment);
    Free commentPatchToFree(FreeDto.PatchComment patchComment);


}
