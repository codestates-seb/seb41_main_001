package com.main_001.server.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginDto {
    private String email;

    private String password;
}
