package com.main_001.server.member.dto;

import com.main_001.server.free.dto.ResponseDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MemberFreeLikeResponseDto {
    @ApiModelProperty(example = "Free id")
    private long freeId;

    @ApiModelProperty(example = "Member id")
    private long memberId;

    @ApiModelProperty(example = "글 제목")
    private String title;

    @ApiModelProperty(example = "자유글 태그")
    private List<ResponseDto.FreeTag> freeTags;
}
