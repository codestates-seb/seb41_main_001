package com.main_001.server.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;

@AllArgsConstructor
@Getter
public class MemberPostDto {

    @ApiModelProperty(example = "email@gmail.com")
    @Email
    private String email;

    @ApiModelProperty(example = "비밀번호")
    private String password;

    @ApiModelProperty(example = "이름")
    private String name;

    @ApiModelProperty(example = "생년월일")
    private String birth;

    @ApiModelProperty(example = "닉네임")
    private String nickname;

    @ApiModelProperty(example = "전화번호")
    private String phone;

    @ApiModelProperty(example = "성별")
    private String sex;

    // region 패키지 생성 후 지역 추가
}
