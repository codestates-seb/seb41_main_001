package com.main_001.server.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MemberPatchDto {

    @ApiModelProperty(example = "경로에 포함되는 값입니다.")
    private long memberId;

    @ApiModelProperty(example = "이름")
    private String name;

    @ApiModelProperty(example = "생년월일")
    private String birth;

    @ApiModelProperty(example = "현재 비밀번호")
    private String curPassword;

    @ApiModelProperty(example = "새 비밀번호")
    private String newPassword;

    @ApiModelProperty(example = "닉네임")
    private String nickname;

    @ApiModelProperty(example = "성별")
    private String sex;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}
