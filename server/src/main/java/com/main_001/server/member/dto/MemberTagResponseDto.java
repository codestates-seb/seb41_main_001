package com.main_001.server.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberTagResponseDto {
        @ApiModelProperty(example = "Tag id")
        private long tagId;

        @ApiModelProperty(example = "태그 이름")
        private String tagName;

        @ApiModelProperty(example = "태그 이모지")
        private String emoji;
}
