package com.main_001.server.recruit.controller;

import com.main_001.server.dto.MultiResponseDto;
import com.main_001.server.dto.SingleResponseDto;
import com.main_001.server.recruit.dto.*;
import com.main_001.server.recruit.entity.*;
import com.main_001.server.recruit.mapper.RecruitMapper;
import com.main_001.server.recruit.service.RecruitService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recruits")
public class RecruitController {

    private final RecruitService recruitService;
    private final RecruitMapper recruitMapper;

    public RecruitController(RecruitService recruitService, RecruitMapper recruitMapper) {
        this.recruitService = recruitService;
        this.recruitMapper = recruitMapper;
    }

    @PostMapping
    public ResponseEntity postRecruit(@RequestBody RecruitDto.Post requestBody) {
        Recruit recruit = recruitService.createRecruit(recruitMapper.recruitPostDtoToRecruit(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)), HttpStatus.CREATED);
        //아래는 stub
//        StubResponse.StubRecruit stubRecruit = new StubResponse.StubRecruit();
//        return new ResponseEntity(stubRecruit, HttpStatus.CREATED);
    }

    @GetMapping("/{recruit-id}")
    public ResponseEntity getRecruit(@PathVariable("recruit-id") long recruitId) {
        Recruit recruit = recruitService.findRecruit(recruitId);
        return new ResponseEntity(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)), HttpStatus.OK);
        //아래는 stub
//        StubResponse.StubRecruit stubRecruit = new StubResponse.StubRecruit();
//        return new ResponseEntity(
//                new SingleResponseDto<>(stubRecruit), HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity getRecruits(@RequestParam int page,
                                      @RequestParam int size,
                                      @RequestParam(required = false, defaultValue = "all") String tag,
                                      @RequestParam(required = false, defaultValue = "all") String status) {
        Page<Recruit> pageRecruits = recruitService.findRecruits(page-1, size, tag, status);
        List<Recruit> recruits = pageRecruits.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(recruitMapper.recruitsToRecruitResponseDtos(recruits),pageRecruits),
                HttpStatus.OK);
        //아래는 stub
//        StubResponse.StubRecruit stubRecruit1 = new StubResponse.StubRecruit();
//        StubResponse.StubRecruit stubRecruit2 = new StubResponse.StubRecruit();
//        List<StubResponse.StubRecruit> stubRecruits = List.of(stubRecruit1, stubRecruit2);
//        PageRequest pageRequest = PageRequest.of(page - 1, size);
//        int start = (int) pageRequest.getOffset();
//        int end = Math.min((start + pageRequest.getPageSize()), stubRecruits.size());
//
//        Page<StubResponse.StubRecruit> pageStubRecruits = new PageImpl<>(stubRecruits.subList(start, end), pageRequest, stubRecruits.size());
//        List<StubResponse.StubRecruit> stubRecruitList = pageStubRecruits.getContent();
//        return new ResponseEntity(
//                new MultiResponseDto<>(stubRecruitList, pageStubRecruits),
//                HttpStatus.OK
//        );
    }

    @PatchMapping("/{recruit-id}")
    public ResponseEntity patchRecruit(@PathVariable("recruit-id") long recruitId,
                                       @RequestBody RecruitDto.Patch requestBody) {
        Recruit recruit = recruitService.updateRecruit(recruitId, recruitMapper.recruitPatchDtoToRecruit(requestBody));

        return new ResponseEntity(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)), HttpStatus.OK);
        //아래는 stub
//        StubResponse.StubRecruit stubRecruit = new StubResponse.StubRecruit();
//        return new ResponseEntity(
//                new SingleResponseDto<>(stubRecruit), HttpStatus.OK);
    }

    @DeleteMapping("/{recruit-id}")
    public ResponseEntity deleteRecruit(@PathVariable("recruit-id") long recruitId,
                                        @RequestBody RecruitDto.Delete requestBody) {
        recruitService.deleteRecruit(recruitId, requestBody);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{recruit-id}/status")
    public ResponseEntity changeStatus(@PathVariable("recruit-id") long recruitId,
                                       @RequestBody RecruitDto.Patch requestBody) {
        Recruit recruit = recruitService.updateStatus(recruitId, requestBody);
        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)),HttpStatus.OK);
        //아래는 stub
//        StubResponse.StubRecruit stubRecruit = new StubResponse.StubRecruit();
//        return new ResponseEntity(
//                new SingleResponseDto<>(stubRecruit), HttpStatus.OK);
    }

    @PatchMapping("/{recruit-id}/likes")
    public ResponseEntity patchLike(@PathVariable("recruit-id") long recruitId,
                                      @RequestBody RecruitLikeDto requestBody) {
        List<RecruitLike> recruitLikes = recruitService.updateLike(recruitId, recruitMapper.recruitLikeDtoToRecruitLike(requestBody)).getRecruitLikes();

        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitLikesToRecruitLikeResponseDtos(recruitLikes)), HttpStatus.OK);
        //아래는 stub
//        StubResponse.StubRecruit stubRecruit = new StubResponse.StubRecruit();
//        return new ResponseEntity(
//                new SingleResponseDto<>(stubRecruit), HttpStatus.OK);
    }

    @PostMapping("/{recruit-id}")
    public ResponseEntity postComment(@PathVariable("recruit-id") long recruitId,
                                      @RequestBody RecruitCommentDto.Default requestBody) {
        RecruitComment recruitComment = recruitService.createComment(recruitId, recruitMapper.recruitCommentDtoToRecruitComment(requestBody));
        return new ResponseEntity(
                new SingleResponseDto<>(recruitMapper.recruitCommentToRecruitCommentResponseDto(recruitComment)),
                HttpStatus.CREATED
        );

        //아래는 stub
//        StubResponse.StubRecruitComment stubRecruitComment = new StubResponse.StubRecruitComment();
//
//        return new ResponseEntity(
//                new SingleResponseDto<>(stubRecruitComment),
//                HttpStatus.CREATED
//        );
    }

    @PatchMapping("/{recruit-id}/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("recruit-id") long recruitId,
                                       @PathVariable("comment-id") long commentId,
                                       @RequestBody RecruitCommentDto.Default requestBody) {
        RecruitComment recruitComment = recruitService.updateComment(recruitId, commentId, recruitMapper.recruitCommentDtoToRecruitComment(requestBody));
        return new ResponseEntity(
                new SingleResponseDto<>(recruitMapper.recruitCommentToRecruitCommentResponseDto(recruitComment)),
                HttpStatus.OK);
        //아래는 stub
//        StubResponse.StubRecruitComment stubRecruitComment = new StubResponse.StubRecruitComment();
//
//        return new ResponseEntity(
//                new SingleResponseDto<>(stubRecruitComment),
//                HttpStatus.OK
//        );
    }

    //delete 시 member-id를 받아와서 작성자와 비교 후 삭제?
    @DeleteMapping("/{recruit-id}/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("recruit-id") long recruitId,
                                        @PathVariable("comment-id") long commentId,
                                        @RequestBody RecruitCommentDto.Delete requestBody) {
        Recruit recruit = recruitService.deleteComment(recruitId, commentId, requestBody.getMemberId());
        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)),HttpStatus.OK);
        //아래는 stub
    }

    @PatchMapping("/{recruit-id}/bringup")
    public ResponseEntity bringUp(@PathVariable("recruit-id") long recruitId) {
        Recruit recruit = recruitService.bringUpRecruit(recruitId);
        return new ResponseEntity(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)),
                HttpStatus.OK
        );
        //아래는 stub
//        StubResponse.StubRecruit stubRecruit = new StubResponse.StubRecruit();
//        return new ResponseEntity(
//                new SingleResponseDto<>(stubRecruit),
//                HttpStatus.OK
//        );
    }

    @PatchMapping("/{recruit-id}/application")
    public ResponseEntity patchRecruit(@PathVariable("recruit-id") long recruitId,
                                       @RequestBody ApplyDto requestBody) {
        List<Apply> applies = recruitService.createAppliment(recruitId, recruitMapper.applyDtoToApply(requestBody)).getApplies();
        return new ResponseEntity(
                new SingleResponseDto<>(recruitMapper.appliesToApplyResponseDtos(applies)), HttpStatus.CREATED
        );
        //아래는 stub
//        StubResponse.StubApply stubApply1 = new StubResponse.StubApply();
//        StubResponse.StubApply stubApply2 = new StubResponse.StubApply();
//        List<StubResponse.StubApply> applies = List.of(stubApply1, stubApply2);
//        return new ResponseEntity(
//                new SingleResponseDto<>(applies), HttpStatus.CREATED
//        );
    }

//    @DeleteMapping("/{recruit-id}/cancellation/{apply-id}")
//    public ResponseEntity cancelRecruit(@PathVariable("recruit-id") long recruitId,
//                                        @PathVariable("apply-id") long applyId,
//                                        @RequestBody ApplyDto requestBody) {
//
//        //Todo:
//
//        //아래는 stub
//        StubResponse.StubApply stubApply2 = new StubResponse.StubApply();
//        List<StubResponse.StubApply> applies = List.of(stubApply2);
//        return new ResponseEntity(
//                new SingleResponseDto<>(applies), HttpStatus.OK);
//    }

    @PostMapping("/{recruit-id}/reviews")
    public ResponseEntity postReview(@PathVariable("recruit-id") long recruitId,
                                     @RequestBody ReviewDto requestBody) {
        List<Review> reviews = recruitService.createReview(recruitId, recruitMapper.reviewDtoToReview(requestBody));
        return new ResponseEntity(
                new SingleResponseDto<>(recruitMapper.reviewsToReviewResponseDtos(reviews)), HttpStatus.CREATED);
        //아래는 stub
//        StubResponse.StubReview stubReview = new StubResponse.StubReview();
//
//        return new ResponseEntity(
//                new SingleResponseDto<>(stubReview), HttpStatus.CREATED);
    }
}
