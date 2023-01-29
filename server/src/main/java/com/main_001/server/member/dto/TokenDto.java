package com.main_001.server.member.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpHeaders;

public class TokenDto {

    @Getter
    public static class Token {
        private String accessToken;
        private String refreshToken;
    }

    @Getter
    public static class Response {
        private HttpHeaders headers;

        @Builder
        public Response(HttpHeaders headers) {
            this.headers = headers;
        }
    }
}
