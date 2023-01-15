package com.main_001.server.member.dto;

import lombok.Getter;

import java.sql.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


public class MemberStubResponse {

    @Getter
    public static class MyStub {
        private long memberId = 1L;

        private String name = "번잔중";

        private String birth = "1994-02-05";

        private String nickname = "chaning";

        private String email = "ggammancj@gmail.com";

        private String phone = "010-4016-9911";

        private String sex = "male";

        private LocalDateTime createdAt = LocalDateTime.now();

        private int heart = 50;

        // 모집 게시판
        private List<MemberStubResponse.StubApply> applies = List.of(new StubApply());

        private List<MemberStubResponse.StubRecruit> recruits = List.of(new StubRecruit());

        private List<MemberStubResponse.StubRecruitLike> recruitLikes = List.of(new StubRecruitLike());

        private List<MemberStubResponse.StubReview> reviews = List.of(new StubReview());

        private List<MemberStubResponse.StubRecruitComment> recruitComments = List.of(new StubRecruitComment());

        // 자유 게시판
        private List<MemberStubResponse.StubFreeBoard> freeBoards = List.of(new StubFreeBoard());

        private List<MemberStubResponse.StubFreeBoardLike> freeBoardLikes = List.of(new StubFreeBoardLike());

        private List<MemberStubResponse.StubFreeBoardComment> freeBoardComments = List.of(new StubFreeBoardComment());
    }

    @Getter
    public static class OtherStub {
        private long memberId = 1L;

        private String nickname = "chaning";

        private String sex = "male";

        private int heart = 40;

        private List<MemberStubResponse.StubRecruit> recruits = List.of(new StubRecruit());

        private List<MemberStubResponse.StubFreeBoard> freeBoards = List.of(new StubFreeBoard());
    }

    // 지원한 Recruit
    @Getter
    public static class StubApply {
        private long recruitId = 2;

        private String title = "stub 모집글 제목";

        private int require = 10;

        private int minRequire = 5;

        private LocalDateTime dueDate = LocalDateTime.of(2023, 1, 31, 0, 0);

        private List<StubRecruitTag> recruitTags = List.of(new StubRecruitTag());
    }

    // 작성한 Recruit 게시글
    @Getter
    public static class StubRecruit {
        private long recruitId = 2;

        private String title = "stub recruit 작성글 제목";

        private int require = 10;

        private int minRequire = 5;

        private LocalDateTime dueDate = LocalDateTime.of(2023, 1, 31, 0, 0);

        private List<StubRecruitTag> recruitTags = List.of(new StubRecruitTag());
    }

    // 좋아요 누른 게시글(Recruit)
    @Getter
    public static class StubRecruitLike {
        private long recruitId = 2;

        private String title = "stub Like 제목";

        private int require = 10;

        private int minRequire = 5;

        private LocalDateTime dueDate = LocalDateTime.of(2023, 1, 31, 0, 0);

        private List<StubRecruitTag> recruitTags = List.of(new StubRecruitTag());
    }

    // 리뷰 내용 확인
    @Getter
    public static class StubReview {
        private long recruitId = 2;

        private String body = "stub 리뷰 내용";

        private int star = 4;
    }

    // 작성한 댓글(Recruit)
    @Getter
    public static class StubRecruitComment {
        private long recruitId = 2;

        private String body = "stub 댓글 내용";

        private LocalDateTime createdAt = LocalDateTime.now();

        private LocalDateTime modifiedAt = LocalDateTime.now();
    }

    // 작성한 자유 게시글
    @Getter
    public static class StubFreeBoard {
        private long freeBoardId = 2;

        private String title = "stub FreeBoard 작성글 제목";

        private int require = 10;

        private int minRequire = 5;

        private LocalDateTime dueDate = LocalDateTime.of(2023, 1, 31, 0, 0);

        private List<StubRecruitTag> recruitTags = List.of(new StubRecruitTag());
    }

    // 좋아요 누른 게시글(FreeBoard)
    @Getter
    public static class StubFreeBoardLike {
        private long freeBoardId = 2;

        private String title = "stub Like 제목";

        private int require = 10;

        private int minRequire = 5;

        private LocalDateTime dueDate = LocalDateTime.of(2023, 1, 31, 0, 0);

        private List<StubRecruitTag> recruitTags = List.of(new StubRecruitTag());
    }

    // 작성한 댓글(FreeBoard)
    @Getter
    public static class StubFreeBoardComment {
        private long freeBoardId = 2;

        private String body = "stub 댓글 내용";

        private LocalDateTime createdAt = LocalDateTime.now();

        private LocalDateTime modifiedAt = LocalDateTime.now();
    }

    @Getter
    public static class StubRecruitTag {
        private String tag = "야구";
    }
}
