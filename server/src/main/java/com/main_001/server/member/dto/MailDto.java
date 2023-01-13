package com.main_001.server.member.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MailDto {
    @ApiModelProperty(example = "email@gmail.com")
    private String email;
}
