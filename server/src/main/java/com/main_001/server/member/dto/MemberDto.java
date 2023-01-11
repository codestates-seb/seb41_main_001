package com.main_001.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {

    @AllArgsConstructor
    @Getter
    public static class Post {
        @Email
        private String email;

        private String password;

        private String name;

        private String birth;

        private String nickname;

        private String phone;

        private String sex;

        // region 패키지 생성 후 지역 추가
    }

    @AllArgsConstructor
    @Getter
    public static class Patch {
        private long memberId;

        private String name;

        private String birth;

        private String curPassword;

        private String newPassword;

        private String nickname;

        private String sex;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class MyResponse {
        private long memberId;

        private String name;

        private String birth;

        private String nickname;

        private String email;

        private String phone;

        private String sex;

        private LocalDateTime createdAt;

        private int heart;

        // Recruit, FreeBoard response 추가

    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class OtherResponse {
        private long memberId;

        private String nickname;

        private String sex;

        private int heart;

        // Recruit, FreeBoard response 추가

    }

}
