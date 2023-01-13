package com.main_001.server.recruit.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ResponseDto {

    @Builder
    @Getter
    public static class Apply{
//        private long applyId;
        @ApiModelProperty(example = "Member id")
        private long memberId;
        //필요하면 아래항목 추가

        @ApiModelProperty(example = "닉네임")
        private String nickname;

        @ApiModelProperty(example = "심박수")
        private int heart;
    }

    @Builder
    @Getter
    public static class RecruitComment{
//        private long recruitCommentId;
        @ApiModelProperty(example = "Member id")
        private long memberId;
        //필요하면 아래항목 추가

        @ApiModelProperty(example = "낙네임")
        private String nickname;

        @ApiModelProperty(example = "심박수")
        private int heart;

        @ApiModelProperty(example = "본문 내")
        private String body;

        @ApiModelProperty(example = "글 작성 일자")
        private LocalDateTime createdAt;

        @ApiModelProperty(example = "모집글 수정 일자")
        private LocalDateTime modifiedAt;
    }

    @Builder
    @Getter
    public static class RecruitLike {
//        private long recruitLikeId;
        @ApiModelProperty(example = "Member id")
        private long memberId;
    }

    @Builder
    @Getter
    public static class RecruitTag {
//        private long recruitTagId;
        @ApiModelProperty(example = "Tag id")
        private long tagId;

        @ApiModelProperty(example = "태그 이름")
        private String tagName;
    }

    @Builder
    @Getter
    public static class Review {
        @ApiModelProperty(example = "Member id")
        private long memberId;
        //필요하면 아래항목 추가
        @ApiModelProperty(example = "낙네임")
        private String nickname;

        @ApiModelProperty(example = "심박수")
        private int heart;

        @ApiModelProperty(example = "리뷰 내용")
        private String body;

        @ApiModelProperty(example = "별점")
        private int star;
    }
}
