package com.main_001.server.recruit.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class RecruitCommentDto {
        @ApiModelProperty(example = "Member id")
        private long memberId;
        @ApiModelProperty(example = "댓글 내용 작성")
        private String body;
}
