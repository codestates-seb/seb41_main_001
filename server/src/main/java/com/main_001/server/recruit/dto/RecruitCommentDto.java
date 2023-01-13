package com.main_001.server.recruit.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class RecruitCommentDto {
        @Getter
        public static class Default {
                private long memberId;
                @NotBlank
                private String body;
        }

        @Getter
        public static class Delete{
                private long memberId;
        }
}
