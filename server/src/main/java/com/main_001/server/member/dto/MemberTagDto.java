package com.main_001.server.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class MemberTagDto {
    @ApiModelProperty(example = "Tag id")
    private long tagId;

    @ApiModelProperty(example = "태그 이름")
    private String tagName;
}
