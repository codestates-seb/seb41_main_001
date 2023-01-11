package com.main_001.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import java.sql.Timestamp;

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
    public static class Response {
        private long memberId;

        private String name;

        private String birth;

        private String nickname;

        private String email;

        private String phone;

        private String sex;

        private Timestamp createdAt;

        private int heart;
    }
}
