package com.main_001.server.tag.controller;

import com.main_001.server.tag.dto.TagDto;
import com.main_001.server.tag.mapper.TagMapper;
import com.main_001.server.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/tags")
@Validated
@RequiredArgsConstructor
public class TagController {
    private TagService tagService;
    private TagMapper tagMapper;

    @PostMapping
    public ResponseEntity postTag(TagDto.Post tagPostDto){
        return ResponseEntity.ok().build();
    }
    @GetMapping("/recruits")
    public ResponseEntity getRecruitByTag(){
        return ResponseEntity.ok().build();
    }
    @GetMapping("/freeboards")
    public ResponseEntity getFreeboardsByTag(){
        return ResponseEntity.ok().build();
    }
}
