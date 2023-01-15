package com.main_001.server.free.controller;

import com.main_001.server.dto.MultiResponseDto;
import com.main_001.server.dto.SingleResponseDto;
import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.dto.FreeStubResponse;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.entity.FreeComment;
import com.main_001.server.free.mapper.FreeMapper;
import com.main_001.server.free.service.FreeService;
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
@RequiredArgsConstructor
public class FreeController {
    private final FreeMapper freeMapper;
    private final FreeService freeService;

    @PostMapping
    public ResponseEntity createFreeboard(@RequestBody FreeDto.PostFreeboard requestBody){
        Free free = freeService.createFreeboard(freeMapper.freeboardPostToFree(requestBody));
        return new ResponseEntity<>(freeMapper.FreeToFreeResponseDto(free), HttpStatus.CREATED);
//        FreeStubResponse.StubFreeBoard stubFreeBoard = new FreeStubResponse.StubFreeBoard();
//        return new ResponseEntity<>(stubFreeBoard, HttpStatus.CREATED);
    }

    @PostMapping("/{free-id}")
    public ResponseEntity createComment(@PathVariable("free-id") @Positive int id,
                                        FreeDto.PostComment requestBody){
        FreeComment freeComment = freeService.createFreeComment(freeMapper.commentPostToFreeComment(requestBody));
        return new ResponseEntity<>(
                new SingleResponseDto<>(freeMapper.FreeToFreeCommentResponseDto(freeComment)), HttpStatus.CREATED);
//        FreeStubResponse.StubFreeComment stubFreeComment = new FreeStubResponse.StubFreeComment();
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(stubFreeComment), HttpStatus.CREATED);
    }

    @GetMapping("/{free-id}")
    public ResponseEntity getFreeboard(@PathVariable("free-id") @Positive int freeId){
        Free free = freeService.findFreeboard(freeId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(free), HttpStatus.OK);
//        FreeStubResponse.StubFreeBoard stubFreeBoard = new FreeStubResponse.StubFreeBoard();
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(stubFreeBoard), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getFreeboardPage(@RequestParam int page,
                                        @RequestParam int size,
                                        @RequestParam(required = false, defaultValue = "all") String category,
                                        @RequestParam(required = false, defaultValue = "all") String tag,
                                        @RequestParam(required = false) String keyword,
                                        @RequestParam(required = false, defaultValue = "latest") String sort) {//dto
         Page<Free> freeboardsPage = freeService.findFreeboards(page - 1, size);
         List<Free> freeboardsList = freeboardsPage.getContent();
         return new ResponseEntity<>(
                 new MultiResponseDto<>(freeMapper.FreeToFreeMultiRespnseDto(freeboardsList),freeboardsPage), HttpStatus.OK);
//         FreeStubResponse.StubFreeBoard stubFreeBoard1 = new FreeStubResponse.StubFreeBoard();
//         FreeStubResponse.StubFreeBoard stubFreeBoard2 = new FreeStubResponse.StubFreeBoard();
//         List<FreeStubResponse.StubFreeBoard> stubFreeBoards = List.of(stubFreeBoard1, stubFreeBoard2);
//        int start = (int) pageRequest.getOffset();
//        int end = Math.min((start + pageRequest.getPageSize()), stubFreeBoards.size());
//        Page<FreeStubResponse.StubFreeBoard> pageStubFreeboards = new PageImpl<>(stubFreeBoards.subList(start, end),
//                pageRequest, stubFreeBoards.size());
//        List<FreeStubResponse.StubFreeBoard> stubFreeboaedList = pageStubFreeboards.getContent();
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(stubFreeboaedList,pageStubFreeboards), HttpStatus.OK);
    }

    @PatchMapping("/{free-id}")
    public ResponseEntity patchFreeboard(@PathVariable("free-id") @Positive int freeId,
                                        @RequestBody FreeDto.PatchFreeboard requestBody){
        Free freeboard = freeService.findFreeboard(freeId);
        Free free = freeService.updateFreeboard(freeboard, requestBody);
        return new ResponseEntity<>(
                new SingleResponseDto<>(freeMapper.FreeToFreeResponseDto(free)), HttpStatus.OK);
//        FreeStubResponse.StubFreeBoard stubFreeBoard = new FreeStubResponse.StubFreeBoard();
//        return new ResponseEntity<>(stubFreeBoard, HttpStatus.OK);
    }

    @PatchMapping("/{free-id}/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("free-id") @Positive int freeId,
                                      @PathVariable("comment-id") @Positive int commentId,
                                      @RequestBody FreeDto.PatchComment requestBody){
        FreeComment freeComment = freeService.findFreeComment(commentId);
        freeService.updateFreeComment(freeComment);
        return new ResponseEntity<>(
                new SingleResponseDto<>(freeMapper.FreeToFreeCommentResponseDto(freeComment)), HttpStatus.OK);
//        FreeStubResponse.StubFreeComment stubFreeComment = new FreeStubResponse.StubFreeComment();
//        return new ResponseEntity<>(stubFreeComment, HttpStatus.OK);
    }

    @DeleteMapping("/{free-id}")
    public ResponseEntity deleteFreeboard(@PathVariable("free-id") @Positive int freeId,
                                          @RequestBody FreeDto.Delete requestBody){
        freeService.deleteFreeboard(freeId, requestBody.getMemberId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{free-id}/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("free-id") @Positive int freeId,
                                        @PathVariable("comment-id") @Positive int commentId){
        FreeComment freeComment = freeService.findFreeComment(commentId);
        freeService.deleteFreeComment(freeComment);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
