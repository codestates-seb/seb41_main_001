package com.main_001.server.recruit.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ResponseDto {

    @Builder
    @Getter
    public static class Apply{
//        private long applyId;
        private long memberId;
        //필요하면 아래항목 추가
        private String nickname;
        private int heart;
    }

    @Builder
    @Getter
    public static class RecruitComment{
//        private long recruitCommentId;
        private long memberId;
        //필요하면 아래항목 추가
//        private String nickname;
//        private int heart;
        private String body;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Builder
    @Getter
    public static class RecruitLike {
//        private long recruitLikeId;
        private long memberId;
    }

    @Builder
    @Getter
    public static class RecruitTag {
//        private long recruitTagId;
        private long tagId;
        private String tagName;
    }

    @Builder
    @Getter
    public static class Review {
        private long memberId;
        //필요하면 아래항목 추가
//        private String nickname;
//        private int heart;
        private String body;
        private int star;
    }
}
