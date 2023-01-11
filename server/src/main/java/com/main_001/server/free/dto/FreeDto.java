package com.main_001.server.free.dto;

import com.main_001.server.free.entity.FreeLike;
import com.main_001.server.free.entity.FreeTag;
import com.main_001.server.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class FreeDto {
    @AllArgsConstructor
    @Getter
    public static class PostFreeboard{
        @NotBlank(message = "제목 작성을 하지 않을 경우 등록이 불가합니다.")
        private String freeTitle;
        @NotBlank(message = "질문내용 작성을 하지 않을 경우 등록이 불가합니다.")
        private String freeBody;
        @NotBlank(message = "카테고리를 정하지 않을 경우 등록이 불가합니다.")
        private String category;
    }

    @AllArgsConstructor
    @Getter
    public static class PostComment{
        @NotBlank(message = "댓글 작성을 하지 않을 경우 등록이 불가합니다.")
        private String commentBody;
    }

    @AllArgsConstructor
    @Getter
    public static class PatchFreeboard{
        private String freeTitle;
        @NotBlank(message = "질문내용 수정을 하지 않을 경우 등록이 불가합니다.")
        private String freeBody;
        private String category;
    }

    @AllArgsConstructor
    @Getter
    public static class PatchComment{
        @NotBlank(message = "댓글 수정을 하지 않을 경우 등록이 불가합니다.")
        private String commentBody;
    }

    @AllArgsConstructor
    @Getter
    public static class Like{
        private long memberId;
    }

    @AllArgsConstructor
    @Getter
    public static class Tag{
        private long tagId;
        private String tagName;
    }

    @AllArgsConstructor
    @Getter
    public static class Delete{
        private long memberId;
    }

    @AllArgsConstructor
    @Getter
    public static class Response{
        private Long freeId;
        private String freeTitle;
        private String freeBody;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<Like> freeLikes;
        private List<Tag> freeTags;
        private int views;
        private Member memberId;
        private String category;
    }
}
