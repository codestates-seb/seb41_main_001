package com.main_001.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    RECRUIT_NOT_FOUND(404, "Recruit not found");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
