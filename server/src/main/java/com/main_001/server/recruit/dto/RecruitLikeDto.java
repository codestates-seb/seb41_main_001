package com.main_001.server.recruit.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class RecruitLikeDto {
    @ApiModelProperty(example = "Member id")
    private long memberId;
}
