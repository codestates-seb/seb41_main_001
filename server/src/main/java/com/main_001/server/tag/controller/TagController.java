package com.main_001.server.tag.controller;

import com.main_001.server.tag.dto.TagDto;
import com.main_001.server.tag.mapper.TagMapper;
import com.main_001.server.tag.service.TagService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Api(tags = { "Tag" })
@RestController
@RequestMapping("/tags")
@Validated
@RequiredArgsConstructor
public class TagController {
    private TagService tagService;
    private TagMapper tagMapper;

    @ApiOperation(value = "태그 생성", notes = "태그를 생성한다.")
    @PostMapping
    public ResponseEntity postTag(TagDto.Post tagPostDto){
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "태그 기준 모집글 조회", notes = "태그를 기준으로 모집글을 조회한다.")
    @GetMapping("/recruits")
    public ResponseEntity getRecruitByTag(){
        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "태그 기준 자글 조회", notes = "태그를 기준으로 자유글을 조회한다.")
    @GetMapping("/freeboards")
    public ResponseEntity getFreeboardsByTag(){
        return ResponseEntity.ok().build();
    }
}
