package com.main_001.server.recruit.dto;

import com.main_001.server.recruit.entity.Recruit;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class RecruitDto {
    @Getter
    public static class Post{
        //작성자 id, 제목, 본문, 모집인원, 최소인원, 모집 연령대
        private long memberId;

        private String title;

        private String body;

        private int require;

        private int minRequire;

        private List<Integer> ages;
    }

    @Getter
    public static class Patch{
        private long memberId;

        private String title;

        private String body;
    }

    @Getter
    public static class Delete{
        private long memberId;
    }

    @Getter
    public static class Response{
        private long recruitId;
        private String title;
        private String body;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private int require;
        private int minRequire;
        private Recruit.RecruitStatus recruitStatus;
        private double star;
        private int views;
        private int heart;
        private List<Integer> ageGroup;
        private long memberId;
        private String nickname;
        private List<ResponseDto.Apply> applies;
        private List<ResponseDto.RecruitLike> recruitLikes;
        private List<ResponseDto.RecruitTag> recruitTags;
        private List<ResponseDto.Review> reviews;
        private List<ResponseDto.RecruitComment> recruitComments;
    }
}
