package com.main_001.server.free.controller;

import com.main_001.server.dto.MultiResponseDto;
import com.main_001.server.dto.SingleResponseDto;
import com.main_001.server.free.dto.FreeDto;
import com.main_001.server.free.dto.FreeStubResponse;
import com.main_001.server.free.entity.Free;
import com.main_001.server.free.mapper.FreeMapper;
import com.main_001.server.free.service.FreeService;
import com.main_001.server.recruit.dto.StubResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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

@Api(tags = { "Free" })
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

    @ApiOperation(value = "자유글 작성", notes = "제목, 본문, 카테고리를 입력하여 자유글을 작성한다.")
    @PostMapping
    public ResponseEntity createFreeboard(@RequestBody FreeDto.PostFreeboard postFreeboardDto){
        FreeStubResponse.StubFreeBoard stubFreeBoard = new FreeStubResponse.StubFreeBoard();
        return new ResponseEntity<>(stubFreeBoard, HttpStatus.CREATED);
    }

    @ApiOperation(value = "자유글에 대한 댓글 작성", notes = "자유글에 댓글을 작성한다.")
    @PostMapping("/{free-id}")
    public ResponseEntity createComment(@PathVariable("free-id") @Positive int id,
                                        FreeDto.PostComment postCommentDto){
        FreeStubResponse.StubFreeComment stubFreeComment = new FreeStubResponse.StubFreeComment();
        return new ResponseEntity<>(
                new SingleResponseDto<>(stubFreeComment), HttpStatus.CREATED);
    }

    @ApiOperation(value = "자유글 조회", notes = "자유글 id를 path에 붙여서 자유글을 조회한다.")
    @GetMapping("/{free-id}")
    public ResponseEntity getFreeboard(@PathVariable("free-id") @Positive int id){
        FreeStubResponse.StubFreeBoard stubFreeBoard = new FreeStubResponse.StubFreeBoard();
        return new ResponseEntity<>(
                new SingleResponseDto<>(stubFreeBoard), HttpStatus.OK);
    }

    @ApiOperation(value = "자유글 전체 조회", notes = "page, size, category, tag, keyword, sort를 path에 작성하여 필터링한 전체 자유글을 조회한다.")
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

    @ApiOperation(value = "자유글 수정", notes = "자유글 내용의 값을 변경하여 자유글 내용을 수정한다.")
    @PatchMapping("/{free-id}")
    public ResponseEntity editFreeboard(@PathVariable("free-id") @Positive int id,
                                        @RequestBody FreeDto.PatchFreeboard patchFreeboardDto){
        FreeStubResponse.StubFreeBoard stubFreeBoard = new FreeStubResponse.StubFreeBoard();
        return new ResponseEntity<>(stubFreeBoard, HttpStatus.OK);
    }

    @ApiOperation(value = "자유글에 대한 댓글 수정", notes = "자유글에 대한 댓글의 내용을 수정한다.")
    @PatchMapping("/{free-id}/{comment-id}")
    public ResponseEntity editComment(@PathVariable("free-id") @Positive int freeId,
                                      @PathVariable("comment-id") @Positive int commentId,
                                      @RequestBody FreeDto.PatchComment patchCommentDto){
        FreeStubResponse.StubFreeComment stubFreeComment = new FreeStubResponse.StubFreeComment();
        return new ResponseEntity<>(stubFreeComment, HttpStatus.OK);
    }

    @ApiOperation(value = "자유글 삭제", notes = "자유글을 삭제한다.")
    @DeleteMapping("/{free-id}")
    public ResponseEntity deleteFreeboard(@PathVariable("free-id") @Positive int id){
        return new ResponseEntity<>(
                new SingleResponseDto<>(""), HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "자유글에 대한 댓글 삭제", notes = "자유글에 대한 댓글을 삭제한다.")
    @DeleteMapping("/{free-id}/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("free-id") @Positive int freeId,
                                        @PathVariable("comment-id") @Positive int commentId){
        return new ResponseEntity<>(
                new SingleResponseDto<>(""), HttpStatus.NO_CONTENT);
    }
}
