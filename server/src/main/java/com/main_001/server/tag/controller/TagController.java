package com.main_001.server.tag.controller;

import com.main_001.server.dto.MultiResponseDto;
import com.main_001.server.dto.SingleResponseDto;
import com.main_001.server.tag.dto.TagDto;
import com.main_001.server.tag.entity.Tag;
import com.main_001.server.tag.mapper.TagMapper;
import com.main_001.server.tag.service.TagService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = { "Tag" })
@RestController
@RequestMapping("/tags")
@Validated
public class TagController {
    private final TagService tagService;
    private final TagMapper tagMapper;

    public TagController(TagService tagService, TagMapper tagMapper) {
        this.tagService = tagService;
        this.tagMapper = tagMapper;
    }

    @ApiOperation(value = "태그 생성", notes = "태그를 생성한다.")
    @PostMapping
    public ResponseEntity postTag(@RequestBody TagDto.Post tagPostDto){
        Tag tag = tagService.createTag(tagMapper.tagPostDtoToTag(tagPostDto));
        return new ResponseEntity<>(
                new SingleResponseDto<>(tagMapper.tagToTagResponseDto(tag)), HttpStatus.CREATED);
    }

    @ApiOperation(value = "모집글 관련 태그 조회", notes = "모집글을 기준으로 관련 태그를 조회한다.")
    @GetMapping("/recruits")
    public ResponseEntity getTagsFromRecruit(@RequestParam int page,
                                             @RequestParam int size){
        Page<Tag> recruitTags = tagService.findRecruitTags(page-1, size);
        List<Tag> content = recruitTags.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(tagMapper.tagsToTagResponseDtos(content), recruitTags),HttpStatus.OK);
    }

    @ApiOperation(value = "자유 게시글 관련 태그 조회", notes = "자유 게시글을 기준으로 관련 태그를 조회한다.")
    @GetMapping("/freeboards")
    public ResponseEntity getTagsFromFreeBoard(@RequestParam int page,
                                               @RequestParam int size){
        Page<Tag> freeTags = tagService.findFreeTags(page-1, size);
        List<Tag> content = freeTags.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(tagMapper.tagsToTagResponseDtos(content), freeTags),HttpStatus.OK);
    }
}
