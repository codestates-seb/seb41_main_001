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

    BAD_REQUEST(400, "요청 이상함"),
    APPLY_MODIFY_DENIED(401, "모집 완료시 신청 및 신청취소 불가"),
    TAG_NOT_FOUND(404, "해당 태그 존재하지 않음" ),
    TAG_ALREADY_EXIST(409 , "해당 태그가 이미 존재함" ),
    STATUS_NOT_FOUND(404, "해당 상태는 존재하지 않음" ),

    // Member
    WRONG_PASSWORD(400, "잘못된 패스워드 입력"),
    MEMBER_NOT_FOUND(404, "존재하지 않는 회원"),
    NO_PROFILE_IMAGE(400, "프로필 이미지가 존재하지 않습니다."),
    NO_CUR_PASSWORD(400, "현재 비밀번호가 공백입니다."),
    NO_NEW_PASSWORD(400, "새 비밀번호가 공백입니다."),

    // Token
    INVALID_AUTH_TOKEN(504, "유효하지 않은 토큰입니다."),
    INVALID_REFRESH_TOKEN(504, "리프레시 토큰이 유효하지 않습니다."),
    MISMATCH_ACCESS_TOKEN(504, "엑세스 토큰의 유저 정보가 일치하지 않습니다."),
    BLACK_LIST(504, "로그아웃 처리된 토큰입니다."),
    MISSING_HEADER_ACCESS_TOKEN(504,"헤더에 엑세스 토큰을 넣어주세요.");


    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
