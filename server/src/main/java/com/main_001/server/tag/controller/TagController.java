package com.main_001.server.tag.controller;

import com.main_001.server.dto.MultiResponseDto;
import com.main_001.server.dto.SingleResponseDto;
import com.main_001.server.tag.dto.TagDto;
import com.main_001.server.tag.entity.Tag;
import com.main_001.server.tag.mapper.TagMapper;
import com.main_001.server.tag.service.TagService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
    public ResponseEntity postTag(@RequestBody TagDto.Post tagPostDto){
//        Tag tag = tagService.createTag(tagMapper.tagPostDtoToTag(tagPostDto));
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(tag), HttpStatus.CREATED);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @ApiOperation(value = "모집글 관련 태그 조회", notes = "모집글을 기준으로 관련 태그를 조회한다.")
    @GetMapping("/recruits")
    public ResponseEntity getTagsFromRecruit(){
//        List<Tag> recruitTags = tagService.findTagsRecruit();
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(recruitTags),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "자유 게시글 관련 태그 조회", notes = "자유 게시글을 기준으로 관련 태그를 조회한다.")
    @GetMapping("/freeboards")
    public ResponseEntity getTagsFromFreeboard(){
//        List<Tag> freeTags = tagService.findTagsFreeboard();
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(freeTags),HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
