package com.main_001.server.member.dto;

import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.entity.FreeLike;
import com.main_001.server.recruit.dto.RecruitCommentDto;
import com.main_001.server.recruit.dto.RecruitDto;
import com.main_001.server.recruit.dto.RecruitLikeDto;
import com.main_001.server.recruit.dto.ResponseDto;
import com.main_001.server.recruit.entity.*;
import com.main_001.server.tag.entity.Tag;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class MemberDto {

    @AllArgsConstructor
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
        private List<String> locations;

        @ApiModelProperty(example = "[\n" +
                "    {\n" +
                "      \"tagId\": 1,\n" +
                "      \"tagName\": \"축구\"\n" +
                "    }\n" +
                "  ]")
        private List<MemberTagDto> memberTags;
    }

    @AllArgsConstructor
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

        private List<String> locations;

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

    @AllArgsConstructor
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

        private List<String> locations;

        @ApiModelProperty(example = "[\n" +
                "    {\n" +
                "      \"tagId\": 1,\n" +
                "      \"tagName\": \"축구\"\n" +
                "    }\n" +
                "  ]")
        private List<MemberTagResponseDto> memberTags;

        // TODO Recruit, FreeBoard response 추가
        private List<ResponseDto.Apply> applies;

        private List<RecruitDto.Response> recruits;

        private List<ResponseDto.RecruitComment> recruitComments;

        private List<ResponseDto.RecruitLike> recruitLikes;

        private List<ResponseDto.Review> reviews;

//        private List<Free> frees;
//
//        private List<FreeLike> freeLikes;
//
//        private List<FreeComment> freeComments;
    }

    @AllArgsConstructor
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

        @ApiModelProperty(example = "[\n" +
                "    {\n" +
                "      \"tagId\": 1,\n" +
                "      \"tagName\": \"축구\"\n" +
                "    }\n" +
                "  ]")
        private List<MemberTagResponseDto> memberTags;

        // TODO Recruit, FreeBoard response 추가

    }

}
