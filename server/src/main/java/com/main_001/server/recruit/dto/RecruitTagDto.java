package com.main_001.server.recruit.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class RecruitTagDto {
    @ApiModelProperty(example = "Tag id")
    private long tagId;

    @ApiModelProperty(example = "태그 이름")
    private String tagName;
}
