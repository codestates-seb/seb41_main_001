package com.main_001.server.recruit.controller;

import com.main_001.server.dto.MultiResponseDto;
import com.main_001.server.dto.SingleResponseDto;
import com.main_001.server.recruit.dto.*;
import com.main_001.server.recruit.entity.*;
import com.main_001.server.recruit.mapper.RecruitMapper;
import com.main_001.server.recruit.service.RecruitService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Api(tags = {"Recruit"})
@RestController
@RequestMapping("/recruits")
public class RecruitController {

    private final RecruitService recruitService;
    private final RecruitMapper recruitMapper;

    public RecruitController(RecruitService recruitService, RecruitMapper recruitMapper) {
        this.recruitService = recruitService;
        this.recruitMapper = recruitMapper;
    }

    @ApiOperation(value = "모집글 작성", notes = "작성자 id, 제목, 본문, 모집인원, 최소인원, 심박수, 모집 연령대, 태그를 입력하여 모집글을 작성한다.")
    @PostMapping
    public ResponseEntity postRecruit(@RequestPart(value = "recruit") RecruitDto.Post postRecruitDto,
                                      @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        Recruit recruit = recruitService.createRecruit(recruitMapper.recruitPostDtoToRecruit(postRecruitDto), files);

        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)),
                HttpStatus.CREATED);
    }

    @ApiOperation(value = "모집글 조회", notes = "모집글 id를 path에 붙여서 모집글을 조회한다.")
    @GetMapping("/{recruit-id}")
    public ResponseEntity getRecruit(@PathVariable("recruit-id") long recruitId) {
        //Todo : 위치 정보도 받아올 것
        Recruit recruit = recruitService.findRecruit(recruitId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)), HttpStatus.OK);
    }

    @ApiOperation(value = "모집글 전체 조회", notes = "page, size, tagName, status, distanceLimit, lat, lon, keyword를 param으로 받아 필터링한 전체 모집글을 조회한다.(page, size, distanceLimit, lat, lon은 필수값")
    @GetMapping
    public ResponseEntity getRecruits(@RequestParam int page,
                                      @RequestParam int size,
                                      @RequestParam(required = false) String tagName,
                                      @RequestParam(required = false) String status,
                                      @RequestParam double distanceLimit,
                                      @RequestParam double lat,
                                      @RequestParam double lon,
                                      @RequestParam(required = false) String keyword) {
        RecruitDto.Get recruitGetDto = RecruitDto.Get.builder()
                .tagName(tagName)
                .status(status)
                .distanceLimit(distanceLimit)
                .lat(lat)
                .lon(lon)
                .keyword(keyword)
                .build();
        Page<Recruit> pageRecruits = recruitService.findRecruits(page - 1, size, recruitGetDto);
        List<Recruit> recruits = pageRecruits.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(recruitMapper.recruitsToRecruitResponseDtos(recruits), pageRecruits),
                HttpStatus.OK);
    }

    @ApiOperation(value = "모집글 수정", notes = "모집글 내용의 값을 변경하여 모집글 내용을 수정한다.")
    @PatchMapping("/{recruit-id}")
    public ResponseEntity patchRecruit(@PathVariable("recruit-id") long recruitId,
                                       @RequestPart(value = "recruit") RecruitDto.Patch patchRecruitBoardDto,
                                       @RequestPart(value = "files", required = false) List<MultipartFile> files,
                                       @RequestParam(value = "removeImages", required = false, defaultValue = "") List<String> removeImages) {

        Recruit recruit = recruitService.updateRecruit(recruitId, recruitMapper.recruitPatchDtoToRecruit(patchRecruitBoardDto), files, removeImages);
        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)), HttpStatus.OK);
    }

    @ApiOperation(value = "모집글 삭제", notes = "글을 작성한 작성자 id를 입력해서 모집글을 삭제한다.")
    @DeleteMapping("/{recruit-id}")
    public ResponseEntity deleteRecruit(@PathVariable("recruit-id") long recruitId,
                                        @RequestBody RecruitDto.Delete requestBody) {
        recruitService.deleteRecruit(recruitId, requestBody);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "모집글 상태 변경", notes = "모집글의 상태(모집 중, 최소 인원 충족, 모집 완료, 활동 종료)를 변경한다.")
    @PatchMapping("/{recruit-id}/status")
    public ResponseEntity changeStatus(@PathVariable("recruit-id") long recruitId,
                                       @RequestBody RecruitDto.Patch requestBody) {
        Recruit recruit = recruitService.updateStatus(recruitId, requestBody);
        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)), HttpStatus.OK);
    }

    @ApiOperation(value = "모집글 좋아요 표시", notes = "모집글에 좋아요를 누른 member id를 추가하거나 삭제한다.")
    @PatchMapping("/{recruit-id}/likes")
    public ResponseEntity patchLike(@PathVariable("recruit-id") long recruitId,
                                    @RequestBody RecruitLikeDto requestBody) {
        Recruit recruit = recruitService.updateLike(recruitId, recruitMapper.recruitLikeDtoToRecruitLike(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)), HttpStatus.OK);

//        List<RecruitLike> recruitLikes = recruitService.updateLike(recruitId, recruitMapper.recruitLikeDtoToRecruitLike(requestBody)).getRecruitLikes();
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(recruitMapper.recruitLikesToRecruitLikeResponseDtos(recruitLikes)), HttpStatus.OK);
    }

    @ApiOperation(value = "모집글에 대한 댓글 작성", notes = "모집글에 댓글을 작성한다.")
    @PostMapping("/{recruit-id}")
    public ResponseEntity postComment(@PathVariable("recruit-id") long recruitId,
                                      @RequestBody RecruitCommentDto.Default requestBody) {
        Recruit recruit = recruitService.createComment(recruitId, recruitMapper.recruitCommentDtoToRecruitComment(requestBody));
        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)),
                HttpStatus.CREATED
        );
//        RecruitComment recruitComment = recruitService.createComment(recruitId, recruitMapper.recruitCommentDtoToRecruitComment(requestBody));
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(recruitMapper.recruitCommentToRecruitCommentResponseDto(recruitComment)),
//                HttpStatus.CREATED
//        );
    }

    @ApiOperation(value = "모집글에 대한 댓글 수정", notes = "모집글에 대한 댓글의 내용을 수정한다.")
    @PatchMapping("/{recruit-id}/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("recruit-id") long recruitId,
                                       @PathVariable("comment-id") long commentId,
                                       @RequestBody RecruitCommentDto.Default requestBody) {
        Recruit recruit = recruitService.updateComment(recruitId, commentId, recruitMapper.recruitCommentDtoToRecruitComment(requestBody));
        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)),
                HttpStatus.OK);

//        RecruitComment recruitComment = recruitService.updateComment(recruitId, commentId, recruitMapper.recruitCommentDtoToRecruitComment(requestBody));
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(recruitMapper.recruitCommentToRecruitCommentResponseDto(recruitComment)),
//                HttpStatus.OK);
    }

    //delete 시 member-id를 받아와서 작성자와 비교 후 삭제?
    @ApiOperation(value = "모집글에 대한 댓글 삭제", notes = "모집글에 대한 댓글을 삭제한다.")
    @DeleteMapping("/{recruit-id}/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("recruit-id") long recruitId,
                                        @PathVariable("comment-id") long commentId,
                                        @RequestBody RecruitCommentDto.Delete requestBody) {
        Recruit recruit = recruitService.deleteComment(recruitId, commentId, requestBody.getMemberId());
        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)), HttpStatus.OK);
    }

    @ApiOperation(value = "모집글 끌어올리기", notes = "모집글의 시간을 현재 시간으로 변경한다.")
    @PatchMapping("/{recruit-id}/bringup")
    public ResponseEntity bringUp(@PathVariable("recruit-id") long recruitId) {
        Recruit recruit = recruitService.bringUpRecruit(recruitId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)),
                HttpStatus.OK
        );
    }

    @ApiOperation(value = "모집글에 신청하기", notes = "모집글에 회원들이 참여 신청한다.")
    @PatchMapping("/{recruit-id}/application")
    public ResponseEntity applyToRecruit(@PathVariable("recruit-id") long recruitId,
                                       @RequestBody ApplyDto requestBody) {
        Recruit recruit = recruitService.updateAppliment(recruitId, recruitMapper.applyDtoToApply(requestBody));
        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)),
                HttpStatus.CREATED);
//        아래는 신청 리스트를 반환하는 방식
//        List<Apply> applies = recruitService.createAppliment(recruitId, recruitMapper.applyDtoToApply(requestBody)).getApplies();
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(recruitMapper.appliesToApplyResponseDtos(applies)), HttpStatus.CREATED
//        );
    }

    @ApiOperation(value = "모집글 리뷰 작성", notes = "모집글에 대한 리뷰를 작성한다.")
    @PostMapping("/{recruit-id}/reviews")
    public ResponseEntity postReview(@PathVariable("recruit-id") long recruitId,
                                     @RequestBody ReviewDto requestBody) {
        Recruit recruit = recruitService.createReview(recruitId, recruitMapper.reviewDtoToReview(requestBody));
//        List<Review> reviews = recruitService.createReview(recruitId, recruitMapper.reviewDtoToReview(requestBody));
        return new ResponseEntity<>(
                new SingleResponseDto<>(recruitMapper.recruitToRecruitResponseDto(recruit)), HttpStatus.CREATED);
    }
}
