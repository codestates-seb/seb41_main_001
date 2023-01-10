package com.main_001.server.recruit.dto;

import com.main_001.server.recruit.entity.Recruit;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class StubResponse {
    @Getter
    public static class StubRecruit{
        private long recruitId = 1;
        private String title = "stub 제목";
        private String body = "stub 바디";
        private LocalDateTime createdAt = LocalDateTime.now();
        private LocalDateTime modifiedAt = LocalDateTime.now();
        private int require = 10;
        private int minRequire = 5;
        private Recruit.RecruitStatus recruitStatus = Recruit.RecruitStatus.RECRUITING;
        private double star = 4.5;
        private int views = 0;
        private int heart = 70;
        private List<Integer> ageGroup = List.of(10,20);
        private long memberId = 1;
        private String nickname = "stub 닉네임";
        private List<StubResponse.StubApply> applies = List.of(new StubApply());
        private List<StubResponse.StubRecruitLike> recruitLikes = List.of(new StubRecruitLike());
        private List<StubResponse.StubRecruitTag> recruitTags = List.of(new StubRecruitTag());
        private List<StubResponse.StubReview> reviews = List.of(new StubReview());
        private List<StubResponse.StubRecruitComment> recruitComments = List.of(new StubRecruitComment());
    }

    @Getter
    public static class StubApply {
        private long memberId = 2;
    }

    @Getter
    public static class StubRecruitLike {
//        private long recruitLikeId = 1;
        private long memberId = 2;
    }

    @Getter
    public static class StubRecruitTag {
        private long tagId=1;
        private String tagName="stub 태그명";
    }

    @Getter
    public static class StubReview {
        private long memberId=2;
        //필요하면 아래항목 추가
//        private String nickname;
//        private int heart;
        private String body="stub 리뷰 내용";
        private int star= 4;
    }

    @Getter
    public static class StubRecruitComment {
        private long memberId=2;
        //필요하면 아래항목 추가
//        private String nickname;
//        private int heart;
        private String body="stub 댓글내용";
        private LocalDateTime createdAt = LocalDateTime.now();
        private LocalDateTime modifiedAt = LocalDateTime.now();
    }

}
