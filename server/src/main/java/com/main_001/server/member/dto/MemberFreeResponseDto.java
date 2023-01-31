package com.main_001.server.member.dto;

import com.main_001.server.free.dto.ResponseDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class MemberFreeResponseDto {
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
    private List<MemberFreeLikeResponseDto> freeLikes;

    @ApiModelProperty(example = "자유글 운동 태그")
    private List<ResponseDto.FreeTag> freeTags;

    @ApiModelProperty(example = "자유글 댓글")
    private List<ResponseDto.FreeComment> freeComments;

    @ApiModelProperty(example = "조회수")
    private int views;

    @ApiModelProperty(example = "Member ID")
    private long memberId;

    @ApiModelProperty(example = "닉네임")
    private String nickname;

    @ApiModelProperty(example = "심박수")
    private int authorHeart;

    @ApiModelProperty(example = "카테고리")
    private String category;
}
