package com.main_001.server.recruit.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class RecruitLikeDto {
    @ApiModelProperty(example = "Member id")
    @NotBlank
    private long memberId;
}
