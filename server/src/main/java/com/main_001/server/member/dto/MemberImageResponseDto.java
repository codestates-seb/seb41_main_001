package com.main_001.server.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberImageResponseDto {
    @ApiModelProperty(example = "이미지 id")
    private Long memberImageId;

    @ApiModelProperty(example = "Member id")
    private Long memberId;

    @ApiModelProperty(example = "기존 파일명")
    private String originalFileName; // 기존 파일명

    @ApiModelProperty(example = "DB 저장용 파일명")
    private String storedFileName; // 저장용 파일명

    @ApiModelProperty(example = "파일 경로")
    private String filePath;

    @ApiModelProperty(example = "파일 크기")
    private Long fileSize;
}
