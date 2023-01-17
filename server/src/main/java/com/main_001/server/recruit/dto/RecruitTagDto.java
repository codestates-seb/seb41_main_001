package com.main_001.server.recruit.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class RecruitTagDto {
    @ApiModelProperty(example = "Tag id")
    @NotBlank
    private long tagId;

    @ApiModelProperty(example = "태그 이름")
    @NotBlank
    private String tagName;
}
