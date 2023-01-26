package com.main_001.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    //Recruit
    RECRUIT_NOT_FOUND(404, "Recruit not found"),
    RECRUIT_MODIFY_DENIED(401, "Only author can modify recruit" ),
    RECRUIT_DELETE_DENIED(401, "이미 모집 신청이 존재할 경우 삭제 불가"),
    COMMENT_MODIFY_DENIED(401,"작성자만 수정 가능" ),
    COMMENT_DELETE_DENIED(401, "작성자만 삭제 가능" ),
    NOT_MEMBER(401, "모임 참가 인원만 리뷰 작성 가능" ),
    ONLY_ONE_REVIEW(400, "리뷰는 하나만 작성할 수 있음" ),

    //Free
    FREEBOARD_NOT_FOUND(404, "해당 자유 게시글을 못 찾음"),
    FREEBOARD_MODIFY_DENIED(401, "작성자만 수정 가능" ),
    APPLY_MODIFY_DENIED(401, "모집 완료시 신청 및 신청취소 불가");


    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}