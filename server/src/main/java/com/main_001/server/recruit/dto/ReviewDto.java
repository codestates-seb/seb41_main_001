package com.main_001.server.recruit.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ReviewDto {
    @ApiModelProperty(example = "Member id")
    private long memberId;

    @ApiModelProperty(example = "리뷰 내용")
    private String body;

    @ApiModelProperty(example = "별점")
    private int star;
    private String worstMemberNickname;
}
