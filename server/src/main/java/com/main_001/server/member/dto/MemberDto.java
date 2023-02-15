package com.main_001.server.member.dto;

import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.recruit.dto.RecruitDto;
import com.main_001.server.recruit.dto.ResponseDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {

    @Getter
    public static class MemberPostDto {
        @ApiModelProperty(example = "email@gmail.com")
        @Email
        private String email;

        @ApiModelProperty(example = "비밀번호")
        private String password;

        @ApiModelProperty(example = "이름")
        private String name;

        @ApiModelProperty(example = "생년월일")
        private String birth;

        @ApiModelProperty(example = "닉네임")
        private String nickname;

        @ApiModelProperty(example = "전화번호")
        private String phone;

        @ApiModelProperty(example = "성별")
        private String sex;

        // 지역 추가
        @ApiModelProperty(example = "지역")
        private String location;

        @ApiModelProperty(example = "latitude")
        private double lat;

        @ApiModelProperty(example = "longitude")
        private double lon;

        @ApiModelProperty(example = "[\n" +
                "    {\n" +
                "      \"tagId\": 1,\n" +
                "      \"tagName\": \"축구\"\n" +
                "    }\n" +
                "  ]")
        private List<MemberTagDto> memberTags;
    }

    @Getter
    public static class MemberPatchDto {
        @ApiModelProperty(example = "경로에 포함되는 값입니다.")
        private long memberId;

        @ApiModelProperty(example = "닉네임(중복 검사 필요)")
        private String nickname;

        @ApiModelProperty(example = "현재 비밀번호")
        private String curPassword;

        @ApiModelProperty(example = "새 비밀번호")
        private String newPassword;

        @ApiModelProperty(example = "전화번호(중복 검사 필요)")
        private String phone;

        @ApiModelProperty(example = "지역")
        private String location;

        @ApiModelProperty(example = "latitude")
        private double lat;

        @ApiModelProperty(example = "longitude")
        private double lon;

        @ApiModelProperty(example = "[\n" +
                "    {\n" +
                "      \"tagId\": 1,\n" +
                "      \"tagName\": \"축구\"\n" +
                "    }\n" +
                "  ]")
        private List<MemberTagDto> memberTags;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @Getter
    @Builder
    public static class MyResponse {
        @ApiModelProperty(example = "Member id")
        private long memberId;

        @ApiModelProperty(example = "이름")
        private String name;

        @ApiModelProperty(example = "생년월일")
        private String birth;

        @ApiModelProperty(example = "닉네임")
        private String nickname;

        @ApiModelProperty(example = "이메일")
        private String email;

        @ApiModelProperty(example = "전화번호")
        private String phone;

        @ApiModelProperty(example = "성별")
        private String sex;

        @ApiModelProperty(example = "회원가입 일자")
        private LocalDateTime createdAt;

        @ApiModelProperty(example = "심박수")
        private int heart;

        @ApiModelProperty(example = "프로필 이미지")
        private MemberImageResponseDto memberImage;

        @ApiModelProperty(example = "지역")
        private String location;

        @ApiModelProperty(example = "latitude")
        private double lat;

        @ApiModelProperty(example = "longitude")
        private double lon;

        @ApiModelProperty(example = "[\n" +
                "    {\n" +
                "      \"tagId\": 1,\n" +
                "      \"tagName\": \"축구\"\n" +
                "    }\n" +
                "  ]")
        private List<MemberTagResponseDto> memberTags;

        // TODO Recruit, FreeBoard response 추가

        @ApiModelProperty(example = "모집글 지원 현황")
        private List<ResponseDto.Apply> applies;

        @ApiModelProperty(example = "작성한 모집글")
        private List<MemberRecruitResponseDto> recruits;

        @ApiModelProperty(example = "모집글에 작성한 댓글")
        private List<ResponseDto.RecruitComment> recruitComments;

        @ApiModelProperty(example = "좋아요 누른 모집글")
        private List<MemberRecruitLikeResponseDto> recruitLikes;

        @ApiModelProperty(example = "작성한 리뷰")
        private List<ResponseDto.Review> reviews;

        @ApiModelProperty(example = "작성한 자유글")
        private List<MemberFreeResponseDto> frees;

        @ApiModelProperty(example = "자유글에 작성한 댓글")
        private List<com.main_001.server.free.dto.ResponseDto.FreeComment> freeComments;

        @ApiModelProperty(example = "좋아요 누른 자유글")
        private List<MemberFreeLikeResponseDto> freeLikes;

        public void setMemberImage(MemberImageResponseDto memberImage) {
            this.memberImage = memberImage;
        }
    }

    @Getter
    @Builder
    public static class OtherResponse {
        @ApiModelProperty(example = "Member id")
        private long memberId;

        @ApiModelProperty(example = "닉네임")
        private String nickname;

        @ApiModelProperty(example = "성별")
        private String sex;

        @ApiModelProperty(example = "심박수")
        private int heart;

        @ApiModelProperty(example = "프로필 이미지")
        private MemberImageResponseDto memberImage;

        @ApiModelProperty(example = "지역")
        private String location;

        @ApiModelProperty(example = "latitude")
        private double lat;

        @ApiModelProperty(example = "longitude")
        private double lon;

        @ApiModelProperty(example = "[\n" +
                "    {\n" +
                "      \"tagId\": 1,\n" +
                "      \"tagName\": \"축구\"\n" +
                "    }\n" +
                "  ]")
        private List<MemberTagResponseDto> memberTags;

        // TODO Recruit, FreeBoard response 추가
        @ApiModelProperty(example = "작성한 모집글")
        private List<MemberRecruitResponseDto> recruits;

        @ApiModelProperty(example = "작성한 자유글")
        private List<MemberFreeResponseDto> frees;

        private List<String> roles;

        public void setMemberImage(MemberImageResponseDto memberImage) {
            this.memberImage = memberImage;
        }
    }

}
