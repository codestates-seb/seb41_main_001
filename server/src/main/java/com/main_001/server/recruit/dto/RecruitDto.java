package com.main_001.server.recruit.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class RecruitDto {
    @Getter
    public static class Post{
        @ApiModelProperty(example = "Member id")
        private long memberId;

        @ApiModelProperty(example = "글 제목")
        @NotBlank
        private String title;

        @ApiModelProperty(example = "내용 작성")
        @NotBlank
        private String body;

        @ApiModelProperty(example = "모집 인원")
        @NotBlank
        private int require;

        @ApiModelProperty(example = "최소 모집 인원")
        @NotBlank
        private int minRequire;

        @ApiModelProperty(example = "심박수 제한")
        @NotBlank
        private int heartLimit;

        @ApiModelProperty(example = "성별")
        @NotBlank
        private String sex;

        @ApiModelProperty(example = "모집 일시")
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        @NotBlank
        private LocalDateTime date;

        @ApiModelProperty(example = "장소 이름")
        @NotBlank
        private String location;

        @ApiModelProperty(example = "lat")
        private double lat;

        @ApiModelProperty(example = "lon")
        private double lon;


        @ApiModelProperty(example = "모집 연령대")
        @NotBlank
        private List<Integer> ages;

        @ApiModelProperty(example = "[\n" +
                "    {\n" +
                "      \"tagId\": 숫자,\n" +
                "      \"tagName\": \"태그 이름\"\n" +
                "    }\n" +
                "  ]")
        private List<RecruitTagDto> recruitTagDtos;
    }

    @Getter
    @Builder
    public static class Get{
        @ApiModelProperty(example = "검색할 태그")
        private String tagName;

        @ApiModelProperty(example = "모집중, 최소인원충족, 모집완료, 활동종료")
        private String status;

        @ApiModelProperty(example = "거리제한 : km 단위의 숫자로 입력(double)")
        private double distanceLimit;

        @ApiModelProperty(example = "위도 (xx.xxxxx...)")
        private Double lat;

        @ApiModelProperty(example = "경도 (xx.xxxxx...)")
        private Double lon;

        @ApiModelProperty(example = "검색어 입력(title 기준 검색)")
        private String keyword;
    }

    @Getter
    public static class Patch{
        @ApiModelProperty(example = "Member id")
        private long memberId;

        @ApiModelProperty(example = "글 제목")
        @NotBlank
        private String title;

        @ApiModelProperty(example = "내용 작성")
        @NotBlank
        private String body;

        @ApiModelProperty(example = "모집 인원")
        @NotBlank
        private int require;

        @ApiModelProperty(example = "최소 모집 인원")
        @NotBlank
        private int minRequire;

        @ApiModelProperty(example = "심박수 제한")
        @NotBlank
        private int heartLimit;

        @ApiModelProperty(example = "성별")
        @NotBlank
        private String sex;

        @ApiModelProperty(example = "모집 일시")
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        @NotBlank
        private LocalDateTime date;

        @ApiModelProperty(example = "장소 이름")
        @NotBlank
        private String location;

        @ApiModelProperty(example = "lat")
        private double lat;

        @ApiModelProperty(example = "lon")
        private double lon;


        @ApiModelProperty(example = "모집 연령대")
        @NotBlank
        private List<Integer> ages;

        @ApiModelProperty(example = "[\n" +
                "    {\n" +
                "      \"tagId\": 숫자,\n" +
                "      \"tagName\": \"태그 이름\"\n" +
                "    }\n" +
                "  ]")
        private List<RecruitTagDto> recruitTagDtos;
    }

    @Getter
    public static class PatchStatus{
        @ApiModelProperty(example = "Member id")
        @NotBlank
        private long memberId;
    }

    @Getter
    public static class Delete{
        @ApiModelProperty(example = "Member id")
        @NotBlank
        private long memberId;
    }

    @Getter
    @Builder
    public static class Response{
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
        //Todo 추후 작성자 프사 추가

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
        private List<ResponseDto.RecruitLike> recruitLikes;

        @ApiModelProperty(example = "좋아요 개수")
        private int Likes;

        @ApiModelProperty(example = "모집글 운동 태그")
        private List<ResponseDto.RecruitTag> recruitTags;

        @ApiModelProperty(example = "모집글 리뷰")
        private List<ResponseDto.Review> reviews;

        @ApiModelProperty(example = "모집글에 대한 댓글")
        private List<ResponseDto.RecruitComment> recruitComments;
    }

    // Todo : SimpleResponse 정의해서 Page 정보 넘길 땐 넘어가는 정보 최소화하기 -> 현재 전체글 조회 시 거의 대부분의 정보를 가져가고 있다..
}
