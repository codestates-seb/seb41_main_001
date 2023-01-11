package com.main_001.server.free.dto;

import com.main_001.server.recruit.dto.StubResponse;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class FreeStubResponse {
    @Getter
    public static class StubFreeBoard{
        private long freeId = 1;
        private String freeTitle = "Stub 자유게시판 제목";
        private String freeBody = "Stub 자유게시판 내용";
        private LocalDateTime createdAt = LocalDateTime.now();
        private LocalDateTime modifiedAt = LocalDateTime.now();
        private int likes = 59;
        private int views = 30;
        private long memberId = 1;
        private String category = "Stub 카테고리 명";
        private List<FreeStubResponse.StubFreeLike> freeLikes = List.of(new FreeStubResponse.StubFreeLike());
        private List<FreeStubResponse.StubFreeTag> freeTags = List.of(new FreeStubResponse.StubFreeTag());
        private List<FreeStubResponse.StubFreeComment> freeCommets = List.of(new FreeStubResponse.StubFreeComment());
    }

    @Getter
    public static class StubFreeComment{
        private long commentId = 1;
        private long freeId = 1;
        private long memberId = 1;
        private String commentBody = "Stub 댓글 내용";
        private LocalDateTime createdAt = LocalDateTime.now();
        private LocalDateTime modifiedAt = LocalDateTime.now();
    }

    @Getter
    public static class StubFreeLike{
        private long memberId = 2;
    }

    @Getter
    public static class StubFreeTag{
        private long tagId = 1;
        private String tagName = "stub 태그명";
    }
}
