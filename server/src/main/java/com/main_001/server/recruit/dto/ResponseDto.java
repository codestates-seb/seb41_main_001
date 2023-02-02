package com.main_001.server.recruit.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
public class ResponseDto {

    @Builder
    @Getter
    @Setter
    public static class Apply{
        @ApiModelProperty(example = "Recruit id")
        private long recruitId;

        @ApiModelProperty(example = "Member id")
        private long memberId;

        @ApiModelProperty(example = "닉네임")
        private String nickname;

        @ApiModelProperty(example = "심박수")
        private int heart;

        @ApiModelProperty(example = "지원자 프사 file path")
        private String filePath;
    }

    @Builder
    @Getter
    @Setter
    public static class RecruitComment{
        @ApiModelProperty(example = "Recruit id")
        private long recruitId;

        @ApiModelProperty(example = "Recruit Comment id")
        private long recruitCommentId;

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

    @Builder
    @Getter
    public static class RecruitLike {
        @ApiModelProperty(example = "Recruit id")
        private long recruitId;
        @ApiModelProperty(example = "Member id")
        private long memberId;
    }

    @Builder
    @Getter
    public static class RecruitTag {
        @ApiModelProperty(example = "Tag id")
        private long tagId;

        @ApiModelProperty(example = "태그 이름")
        private String tagName;

        @ApiModelProperty(example = "태그 이모지")
        private String emoji;
    }

    @Builder
    @Getter
    public static class Review {
        @ApiModelProperty(example = "Review id")
        private long reviewId;

        @ApiModelProperty(example = "Member id")
        private long memberId;

        @ApiModelProperty(example = "낙네임")
        private String nickname;

        @ApiModelProperty(example = "심박수")
        private int heart;

        @Setter
        @ApiModelProperty(example = "리뷰 작성자 프사 경로")
        private String filePath;

        @ApiModelProperty(example = "리뷰 내용")
        private String body;

        @ApiModelProperty(example = "별점")
        private int star;

        @ApiModelProperty(example = "worst member nickname")
        private String worstMemberNickname;
    }
}
