package com.main_001.server.recruit.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class RecruitCommentDto {
        @Getter
        public static class Default {
                @ApiModelProperty(example = "Member id")
                private long memberId;
                @ApiModelProperty(example = "댓글 내용 작성")
                @NotBlank
                private String body;
        }

        @Getter
        public static class Delete{
                @ApiModelProperty(example = "Member id")
                private long memberId;
        }
}
