package com.main_001.server.free.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

public class ResponseDto {
    @Builder
    @Getter
    public static class FreeTag {
        @ApiModelProperty(example = "Tag id")
        private long tagId;

        @ApiModelProperty(example = "태그 이름")
        private String tagName;

        @ApiModelProperty(example = "태그 이모지")
        private String emoji;
    }

    @Builder
    @Getter
    public static class FreeLike{
        private long memberId;
    }

    public class FreeComment {
    }
}
