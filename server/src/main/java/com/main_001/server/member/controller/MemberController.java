package com.main_001.server.member.controller;

import com.main_001.server.auth.dto.LoginDto;
import com.main_001.server.member.dto.MailDto;
import com.main_001.server.member.dto.MemberDto;
import com.main_001.server.member.dto.TokenDto;
import com.main_001.server.member.entity.Member;
import com.main_001.server.member.mapper.MemberMapper;
import com.main_001.server.member.service.MemberService;
import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Api(tags = { "Member" })
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    // 회원가입
    @ApiOperation(value = "회원가입", notes = "닉네임, 이메일, 비밀번호를 입력하여 회원 정보를 등록한다.")
    @PostMapping( "/signup")
    public ResponseEntity signUp(@RequestBody MemberDto.MemberPostDto memberPost) {
        Member member = memberMapper.memberPostToMember(memberPost);

        Member createMember = memberService.createMember(member);

        return new ResponseEntity<>(memberMapper.memberToMemberMyResponse(createMember), HttpStatus.CREATED);
    }

    // 프로필 이미지 등록(Edit 화면), 추후 token으로 인증받아서 memberId에 접근한다.
    @PostMapping(path = "/profileImage/{member-id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void createMemberImage(@PathVariable("member-id") long memberId,
                                  @RequestPart(value = "file", required = false) List<MultipartFile> files) {
        memberService.createImage(memberId, files);
    }

    // email 중복체크
    @ApiOperation(value = "email 중복 체크", notes = "사용자가 입력한 email이 이미 가입된 정보인지 체크한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "이미 존재하면 true, 없으면 false")
    })
    @GetMapping("/signup/check-email/{email}")
    public ResponseEntity<Boolean> checkEmail(@ApiParam(value = "이메일 주소 입력") @PathVariable("email") String email) {
        return ResponseEntity.ok(memberService.checkEmailDuplication(email));
    }

    // nickname 중복체크
    @ApiOperation(value = "nickname 중복 체크", notes = "사용자가 입력한 닉네임이 이미 가입된 정보인지 체크한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "이미 존재하면 true, 없으면 false")
    })
    @GetMapping("/signup/check-nickname/{nickname}")
    public ResponseEntity<Boolean> checkNickname(@ApiParam(value = "닉네임 입력") @PathVariable("nickname") String nickname) {
        return ResponseEntity.ok(memberService.checkNicknameDuplication(nickname));
    }

    // phone 중복체크
    @ApiOperation(value = "phone 중복 체크", notes = "사용자가 입력한 전화번호가 이미 가입된 정보인지 체크한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "이미 존재하면 true, 없으면 false")
    })
    @GetMapping("/signup/check-phone/{phone}")
    public ResponseEntity<Boolean> checkPhone(@ApiParam(value = "전화번호 입력, 하이픈(-) 포함") @PathVariable("phone") String phone) {
        return ResponseEntity.ok(memberService.checkPhoneDuplication(phone));
    }

    // 임시 비밀번호 발급
    // TODO 이름 + 생년월일 같이 받아서 확인하고 이메일 전송하는 로직도 필요
    @ApiOperation(value = "사용자 비밀번호 찾기", notes = "사용자가 입력한 이메일로 임시 비밀번호를 발송한다.")
    @PostMapping("/find-account")
    public void findAccount(@RequestBody MailDto mailDto) {
        memberService.sendMail(mailDto.getEmail());
    }

    // 로그인
    // TODO 개발 완료 후 봉인 해제, swagger 추가 필요
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDto requestBody) {
        TokenDto.Response response = memberService.loginMember(requestBody);
        return new ResponseEntity<>(response.getHeaders(), HttpStatus.OK);
    }

    // 로그아웃
    // TODO 좀 더 찾아보자, 추후 구현 필요
//    @PostMapping("/logout")
//    public ResponseEntity logout(@RequestHeader("Authorization") String accessToken,
//                                 @RequestHeader("Refresh") String refreshToken) {
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    // 회원 정보 수정
    @ApiOperation(value = "회원 정보 수정", notes = "닉네임, 비밀번호, 전화번호, 지역, 태그 중 변경하고 싶은 정보를 수정할 수 있다. 비밀번호의 경우, 현재 비밀번호와 새 비밀번호를 입력해야 한다.")
    @PatchMapping("/my-page/{member-id}")
    public ResponseEntity patchMyPage(@PathVariable("member-id") long memberId,
                                      @RequestBody MemberDto.MemberPatchDto memberPatch) {
        memberPatch.setMemberId(memberId);

        // 비밀번호가 맞는지 검증 후 변경
        if (memberPatch.getCurPassword() != null)
            memberService.checkPassword(memberId, memberPatch.getCurPassword(), memberPatch.getNewPassword());

        Member member = memberService.updateMember(memberMapper.memberPatchToMember(memberPatch));

        return new ResponseEntity<>(memberMapper.memberToMemberMyResponse(member), HttpStatus.OK);
    }

    // 마이페이지 접속
    // 접근 권한을 로그인한 사용자한테만 준다.
    @ApiOperation(value = "회원 정보 조회(마이페이지)", notes = "로그인한 사용자가 자신의 회원 정보를 조회한다.")
    @GetMapping("/my-page/{member-id}")
    public ResponseEntity getMyPage(@PathVariable("member-id") long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(memberMapper.memberToMemberMyResponse(member), HttpStatus.OK);
    }

    // 다른 회원 정보 확인
    @ApiOperation(value = "타 회원 정보 조회", notes = "member-id에 해당하는 회원의 정보를 조회한다.")
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(memberMapper.memberToMemberOtherResponse(member), HttpStatus.OK);
    }

    // 회원 탈퇴
    @ApiOperation(value = "회원 탈퇴", notes = "member-id에 해당하는 회원의 정보를 삭제한다.")
    @PatchMapping("/my-page/{member-id}/withdraw")
    public ResponseEntity withdrawal(@PathVariable("member-id") long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
