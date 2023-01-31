package com.main_001.server.member.dto;

import com.main_001.server.recruit.dto.ResponseDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class MemberRecruitResponseDto {

    @ApiModelProperty(example = "Recruit id")
    private long recruitId;

    @ApiModelProperty(example = "글 제목")
    private String title;

    @ApiModelProperty(example = "본문 내")
    private String body;

    @ApiModelProperty(example = "모집글 작성 일자")
    private LocalDateTime createdAt;

    @ApiModelProperty(example = "모집글 수정 일자")
    private LocalDateTime modifiedAt;

    @ApiModelProperty(example = "모집 인원")
    private int require;

    @ApiModelProperty(example = "최소 모집 인원")
    private int minRequire;

    @ApiModelProperty(example = "모집 상태")
    private String recruitStatus;

    @ApiModelProperty(example = "별점")
    private double star;

    @ApiModelProperty(example = "조회수")
    private int views;

    @ApiModelProperty(example = "심박수")
    private int heartLimit;

    @ApiModelProperty(example = "연령대")
    private List<String> ageGroup;

    @ApiModelProperty(example = "Member id")
    private long memberId;

    @ApiModelProperty(example = "닉네임")
    private String nickname;

    @ApiModelProperty(example = "작성자 심박수")
    private int authorHeart;

//        @ApiModelProperty()
    private MemberImageResponseDto memberImage;

    @ApiModelProperty(example = "성별")
    private String sex;

    @ApiModelProperty(example = "모집글 마감 일자")
    private LocalDateTime date;

    @ApiModelProperty(example = "모집 지역")
    private String location;

    @ApiModelProperty(example = "lat")
    private double lat;

    @ApiModelProperty(example = "lon")
    private double lon;

    @ApiModelProperty(example = "나와의 거리")
    private double distance;

    @ApiModelProperty(example = "지원자 목록")
    private List<ResponseDto.Apply> applies;

    @ApiModelProperty(example = "모집글 좋아요 누른 member id")
    private List<MemberRecruitLikeResponseDto> recruitLikes;

    @ApiModelProperty(example = "좋아요 개수")
    private int Likes;

    @ApiModelProperty(example = "모집글 운동 태그")
    private List<ResponseDto.RecruitTag> recruitTags;

    @ApiModelProperty(example = "모집글 리뷰")
    private List<ResponseDto.Review> reviews;

    @ApiModelProperty(example = "모집글에 대한 댓글")
    private List<ResponseDto.RecruitComment> recruitComments;
}
