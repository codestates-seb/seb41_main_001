package com.main_001.server.recruit.dto;

import lombok.Getter;

@Getter
public class ReviewDto {
    private long memberId;
    private String body;
    private int star;
    private String worstMemberNickname;
}
