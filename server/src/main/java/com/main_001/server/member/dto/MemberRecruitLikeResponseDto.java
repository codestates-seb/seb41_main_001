package com.main_001.server.member.dto;

import com.main_001.server.recruit.dto.ResponseDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
public class MemberRecruitLikeResponseDto {
    @ApiModelProperty(example = "Recruit id")
    private long recruitId;

    @ApiModelProperty(example = "Member id")
    private long memberId;

    @ApiModelProperty(example = "글 제목")
    private String title;

    @ApiModelProperty(example = "모집 인원")
    private int require;

    @ApiModelProperty(example = "현재 모인 인원")
    private int applyCount;

    @ApiModelProperty(example = "모집글 마감 일자")
    private LocalDateTime date;

    @ApiModelProperty(example = "모집글 운동 태그")
    private List<ResponseDto.RecruitTag> recruitTags;
}
