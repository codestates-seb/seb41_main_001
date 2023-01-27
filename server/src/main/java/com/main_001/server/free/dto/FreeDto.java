package com.main_001.server.free.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class FreeDto {
    @Getter
    public static class PostFreeBoard{
        @ApiModelProperty(example = "Member ID")
        private long memberId;
        @ApiModelProperty(example = "글 제목")
        @NotBlank(message = "제목 작성을 하지 않을 경우 등록이 불가합니다.")
        private String freeTitle;

        @ApiModelProperty(example = "내용 작성")
        @NotBlank(message = "질문내용 작성을 하지 않을 경우 등록이 불가합니다.")
        private String freeBody;

        @ApiModelProperty(example = "카테고리")
        @NotBlank(message = "카테고리를 정하지 않을 경우 등록이 불가합니다.")
        private String category;

        @ApiModelProperty(example = "[\n" +
                "    {\n" +
                "      \"tagId\": 숫자,\n" +
                "      \"tagName\": \"태그 이름\"\n" +
                "    }\n" +
                "  ]")
        private List<FreeDto.Tag> freeTagDtos;

        @ApiModelProperty(example = "자유 게시글 위치정보")
        private String location;
    }

    @Getter
    public static class PostComment{
        @ApiModelProperty(example = "Member ID")
        private long memberId;
        @ApiModelProperty(example = "Free ID")
        private long freeId;
        @ApiModelProperty(example = "내용 작성")
        @NotBlank(message = "댓글 작성을 하지 않을 경우 등록이 불가합니다.")
        private String commentBody;
    }

    @Getter
    public static class PatchFreeBoard{
        @ApiModelProperty(example = "Member ID")
        private long memberId;

        @ApiModelProperty(example = "글 제목")
        private String freeTitle;

        @ApiModelProperty(example = "내용 작성")
        private String freeBody;

        @ApiModelProperty(example = "카테고리")
        private String category;
    }

    @Getter
    public static class PatchComment{
        @ApiModelProperty(example = "Member ID")
        private long memberId;
        @ApiModelProperty(example = "Free ID")
        private long freeId;
        @ApiModelProperty(example = "내용 작성")
        @NotBlank(message = "댓글 수정을 하지 않을 경우 등록이 불가합니다.")
        private String commentBody;
    }

    @Getter
    public static class Like{
        @ApiModelProperty(example = "Member ID")
        private long memberId;
    }

    @Getter
    public static class Tag{
        @ApiModelProperty(example = "Tag ID")
        private long tagId;

        @ApiModelProperty(example = "태그 이름")
        private String tagName;

        @ApiModelProperty(example = "태그 이모지")
        private String emoji;
    }

    @Getter
    public static class Delete{
        @ApiModelProperty(example = "Member ID")
        private long memberId;
    }

    @Getter
    public static class Search{
        private String type;
        private String keyword;
    }

    @Getter
    @Builder
    public static class Response{
        @ApiModelProperty(example = "Free ID")
        private Long freeId;

        @ApiModelProperty(example = "글 제목")
        private String freeTitle;

        @ApiModelProperty(example = "내용 작성")
        private String freeBody;

        @ApiModelProperty(example = "모집글 작성 일자")
        private LocalDateTime createdAt;

        @ApiModelProperty(example = "모집글 수정 일자")
        private LocalDateTime modifiedAt;

        @ApiModelProperty(example = "자유글 좋아요 누른 Member ID")
        private List<ResponseDto.FreeLike> freeLikes;

        @ApiModelProperty(example = "자유글 운동 태그")
        private List<ResponseDto.FreeTag> freeTags;

        @ApiModelProperty(example = "자유글 댓글")
        private List<ResponseDto.FreeComment> freeComments;

        @ApiModelProperty(example = "조회수")
        private int views;

        @ApiModelProperty(example = "Member ID")
        private long memberId;

        @ApiModelProperty(example = "카테고리")
        private String category;
    }
}
