package com.main_001.server.recruit.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ReviewDto {
    @ApiModelProperty(example = "Member id")
    @NotBlank
    private long memberId;

    @ApiModelProperty(example = "리뷰 내용")
    @NotBlank
    private String body;

    @ApiModelProperty(example = "별점")
    private int star;

    @ApiModelProperty(example = "최악의 멤버 닉네임")
    private String worstMemberNickname;
}
