package com.main_001.server.free.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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
        private long freeId;
        private long memberId;
    }

    @Builder
    @Getter
    @Setter
    public static class FreeComment {
        @ApiModelProperty(example = "Free id")
        private long freeId;

        @ApiModelProperty(example = "Free Comment id")
        private long freeCommentId;

        @ApiModelProperty(example = "Member id")
        private long memberId;

        @ApiModelProperty(example = "닉네임")
        private String nickname;

        @ApiModelProperty(example = "심박수")
        private int heart;

        @ApiModelProperty(example = "작성자 프사 경로")
        private String filePath;

        @ApiModelProperty(example = "댓글 내용")
        private String body;

        @ApiModelProperty(example = "댓글 작성 일자")
        private LocalDateTime createdAt;

        @ApiModelProperty(example = "댓글 수정 일자")
        private LocalDateTime modifiedAt;
    }
}