package com.main_001.server.free.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class FreeCommentDto {
    @Getter
    public static class Default {
        @ApiModelProperty(example = "Member ID")
        private long memberId;

        @ApiModelProperty(example = "내용 작성")
        @NotBlank(message = "댓글 작성을 하지 않을 경우 등록이 불가합니다.")
        private String commentBody;
    }

    @Getter
    public static class Delete {
        @ApiModelProperty(example = "Member id")
        @NotBlank
        private long memberId;
    }
}
