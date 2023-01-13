package com.main_001.server.free.dto;

import com.main_001.server.free.entity.FreeLike;
import com.main_001.server.free.entity.FreeTag;
import com.main_001.server.member.entity.Member;
import io.swagger.annotations.ApiModelProperty;
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
        @ApiModelProperty(example = "글 제목")
        @NotBlank(message = "제목 작성을 하지 않을 경우 등록이 불가합니다.")
        private String freeTitle;

        @ApiModelProperty(example = "내용 작성")
        @NotBlank(message = "질문내용 작성을 하지 않을 경우 등록이 불가합니다.")
        private String freeBody;

        @ApiModelProperty(example = "카테고리")
        @NotBlank(message = "카테고리를 정하지 않을 경우 등록이 불가합니다.")
        private String category;
    }

    @AllArgsConstructor
    @Getter
    public static class PostComment{
        @ApiModelProperty(example = "내용 작성")
        @NotBlank(message = "댓글 작성을 하지 않을 경우 등록이 불가합니다.")
        private String commentBody;
    }

    @AllArgsConstructor
    @Getter
    public static class PatchFreeboard{
        @ApiModelProperty(example = "글 제목")
        private String freeTitle;

        @ApiModelProperty(example = "내용 작성")
        @NotBlank(message = "질문내용 수정을 하지 않을 경우 등록이 불가합니다.")
        private String freeBody;

        @ApiModelProperty(example = "카테고리")
        private String category;
    }

    @AllArgsConstructor
    @Getter
    public static class PatchComment{
        @ApiModelProperty(example = "내용 작성")
        @NotBlank(message = "댓글 수정을 하지 않을 경우 등록이 불가합니다.")
        private String commentBody;
    }

    @AllArgsConstructor
    @Getter
    public static class Like{
        @ApiModelProperty(example = "Member id")
        private long memberId;
    }

    @AllArgsConstructor
    @Getter
    public static class Tag{
        @ApiModelProperty(example = "Tag id")
        private long tagId;

        @ApiModelProperty(example = "태그 이름")
        private String tagName;
    }

    @AllArgsConstructor
    @Getter
    public static class Delete{
        @ApiModelProperty(example = "Member id")
        private long memberId;
    }

    @AllArgsConstructor
    @Getter
    public static class Response{
        @ApiModelProperty(example = "Free id")
        private Long freeId;

        @ApiModelProperty(example = "글 제목")
        private String freeTitle;

        @ApiModelProperty(example = "내용 작성")
        private String freeBody;

        @ApiModelProperty(example = "모집글 작성 일자")
        private LocalDateTime createdAt;

        @ApiModelProperty(example = "모집글 수정 일자")
        private LocalDateTime modifiedAt;

        @ApiModelProperty(example = "자유글 좋아요 누른 member id")
        private List<Like> freeLikes;

        @ApiModelProperty(example = "자유글 운동 태그")
        private List<Tag> freeTags;

        @ApiModelProperty(example = "조회수")
        private int views;

        @ApiModelProperty(example = "Member id")
        private Member memberId;

        @ApiModelProperty(example = "카테고리")
        private String category;
    }
}
