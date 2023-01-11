package com.main_001.server.free.controller;

import com.main_001.server.dto.MultiResponseDto;
import com.main_001.server.dto.SingleResponseDto;
import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.dto.FreeStubResponse;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.mapper.FreeMapper;
import com.main_001.server.free.service.FreeService;
import com.main_001.server.recruit.dto.StubResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/freeboards")
@Validated
public class FreeController {
    private FreeMapper freeMapper;
    private FreeService freeService;

    public FreeController(FreeMapper freeMapper, FreeService freeService) {
        this.freeMapper = freeMapper;
        this.freeService = freeService;
    }

    @PostMapping
    public ResponseEntity createFreeboard(FreeDto.PostFreeboard postFreeboardDto){
        FreeStubResponse.StubFreeBoard stubFreeBoard = new FreeStubResponse.StubFreeBoard();
        return new ResponseEntity<>(stubFreeBoard, HttpStatus.CREATED);
    }

    @PostMapping("/{free-id}")
    public ResponseEntity createComment(@PathVariable("free-id") @Positive int id,
                                        FreeDto.PostComment postCommentDto){
        FreeStubResponse.StubFreeComment stubFreeComment = new FreeStubResponse.StubFreeComment();
        return new ResponseEntity<>(
                new SingleResponseDto<>(stubFreeComment), HttpStatus.CREATED);
    }

    @GetMapping("/{free-id}")
    public ResponseEntity getFreeboard(@PathVariable("free-id") @Positive int id){
        FreeStubResponse.StubFreeBoard stubFreeBoard = new FreeStubResponse.StubFreeBoard();
        return new ResponseEntity<>(
                new SingleResponseDto<>(stubFreeBoard), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getFreeboardPage(@RequestParam int page,
                                        @RequestParam int size,
                                        @RequestParam(required = false, defaultValue = "all") String category,
                                        @RequestParam(required = false, defaultValue = "all") String tag,
                                        @RequestParam(required = false) String keyword,
                                        @RequestParam(required = false, defaultValue = "latest") String sort){
        FreeStubResponse.StubFreeBoard stubFreeBoard1 = new FreeStubResponse.StubFreeBoard();
        FreeStubResponse.StubFreeBoard stubFreeBoard2 = new FreeStubResponse.StubFreeBoard();
        List<FreeStubResponse.StubFreeBoard> stubFreeBoards = List.of(stubFreeBoard1, stubFreeBoard2);
        PageRequest pageRequest =PageRequest.of(page-1, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), stubFreeBoards.size());

        Page<FreeStubResponse.StubFreeBoard> pageStubFreeboards = new PageImpl<>(stubFreeBoards.subList(start, end), pageRequest, stubFreeBoards.size());
        List<FreeStubResponse.StubFreeBoard> stubFreeboaedList = pageStubFreeboards.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(stubFreeboaedList,pageStubFreeboards), HttpStatus.OK);
    }

    @PatchMapping("/{free-id}")
    public ResponseEntity editFreeboard(@PathVariable("free-id") @Positive int id,
                                        FreeDto.PatchFreeboard patchFreeboardDto){
        FreeStubResponse.StubFreeBoard stubFreeBoard = new FreeStubResponse.StubFreeBoard();
        return new ResponseEntity<>(stubFreeBoard, HttpStatus.OK);
    }

    @PatchMapping("/{free-id}/{comment-id}")
    public ResponseEntity editComment(@PathVariable("free-id") @Positive int freeId,
                                      @PathVariable("comment-id") @Positive int commentId,
                                      FreeDto.PatchComment patchCommentDto){
        FreeStubResponse.StubFreeComment stubFreeComment = new FreeStubResponse.StubFreeComment();
        return new ResponseEntity<>(stubFreeComment, HttpStatus.OK);
    }

    @DeleteMapping("/{free-id}")
    public ResponseEntity deleteFreeboard(@PathVariable("free-id") @Positive int id){
        return new ResponseEntity<>(
                new SingleResponseDto<>(""), HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{free-id}/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("free-id") @Positive int freeId,
                                        @PathVariable("comment-id") @Positive int commentId){
        return new ResponseEntity<>(
                new SingleResponseDto<>(""), HttpStatus.NO_CONTENT);
    }
}
