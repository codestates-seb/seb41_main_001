package com.main_001.server.member.controller;

import com.main_001.server.auth.dto.LoginDto;
import com.main_001.server.dto.SingleResponseDto;
import com.main_001.server.member.dto.MailDto;
import com.main_001.server.member.dto.MemberDto;
import com.main_001.server.member.dto.MemberStubResponse;
import com.main_001.server.member.dto.TokenDto;
import com.main_001.server.member.entity.Member;
import com.main_001.server.member.mapper.MemberMapper;
import com.main_001.server.member.service.MemberService;
import com.main_001.server.recruit.dto.StubResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
public class MemberController {
    private static final int HEART_DEFAULT = 50;
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody MemberDto.Post requestBody) {
//        Member member = memberMapper.memberPostToMember(requestBody);
//        member.setHeart(HEART_DEFAULT); // 가입했을 때는 초기값을 저장해주어야 한다.
//
//        Member createMember = memberService.createMember(member);
//
//        return new ResponseEntity<>(memberMapper.memberToMemberMyResponse(createMember), HttpStatus.CREATED);
        MemberStubResponse.MyStub myStub = new MemberStubResponse.MyStub();
        return new ResponseEntity<>(
                new SingleResponseDto<>(myStub), HttpStatus.CREATED);
    }

    // email 중복체크
    @GetMapping("/signup/check-email/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable("email") String email) {
//        return ResponseEntity.ok(memberService.checkEmailDuplication(email));
        String stubEmail = "ggammancj@gmail.com";
        if (email.equals(stubEmail))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.ok(false);
    }

    // nickname 중복체크
    @GetMapping("/signup/check-nickname/{nickname}")
    public ResponseEntity<Boolean> checkNickname(@PathVariable("nickname") String nickname) {
//        return ResponseEntity.ok(memberService.checkNicknameDuplication(nickname));
        String stubNickname = "chaning";
        if (nickname.equals(stubNickname))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.ok(false);
    }

    // phone 중복체크
    @GetMapping("/signup/check-phone/{phone}")
    public ResponseEntity<Boolean> checkPhone(@PathVariable("phone") String phone) {
//        return ResponseEntity.ok(memberService.checkPhoneDuplication(phone));
        String stubPhone = "010-4016-9911";
        if (phone.equals(stubPhone))
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.ok(false);
    }

    // 임시 비밀번호 발급
    @PostMapping("/find-account")
    public ResponseEntity findAccount(@RequestBody MailDto mailDto) {
//        memberService.sendMail(mailDto.getEmail());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDto requestBody) {
//        TokenDto.Response response = memberService.loginMember(requestBody);
//        return new ResponseEntity<>(response.getHeaders(), HttpStatus.OK);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorizaion", "Bearer accessTokenblahblahblah");
        headers.add("Refresh", "refreshTokenblahblahbalhala");
        headers.add("member-id", "1");
        headers.add("Role", "ROLE_USER");
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }

    // 로그아웃
    // 좀 더 찾아보자, 추후 구현 필요
    @PostMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Authorization") String accessToken,
                                 @RequestHeader("Refresh") String refreshToken) {
//        accessToken = "accessTokenblahblahblah";
//        refreshToken = "refreshTokenblahblahbalhala";
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 회원 정보 수정
    @PatchMapping("/my-page/{member-id}")
    public ResponseEntity patchMyPage(@PathVariable("member-id") long memberId,
                                      @RequestBody MemberDto.Patch requestBody) {
//        requestBody.setMemberId(memberId);
//
//        // 비밀번호가 맞는지 검증 후 변경
//        if (!requestBody.getCurPassword().isEmpty())
//            memberService.checkPassword(memberId, requestBody.getCurPassword(), requestBody.getNewPassword());
//
//        Member member = memberService.updateMember(memberMapper.memberPatchToMember(requestBody));
//
//        return new ResponseEntity<>(memberMapper.memberToMemberMyResponse(member), HttpStatus.OK);
        MemberStubResponse.MyStub myStub = new MemberStubResponse.MyStub();
        return new ResponseEntity<>(
                new SingleResponseDto<>(myStub), HttpStatus.CREATED);
    }

    // 마이페이지 접속
    // 접근 권한을 로그인한 사용자한테만 준다.
    @GetMapping("/my-page/{member-id}")
    public ResponseEntity getMyPage(@PathVariable("member-id") long memberId) {
//        Member member = memberService.findMember(memberId);
        MemberStubResponse.MyStub myStub = new MemberStubResponse.MyStub();
        return new ResponseEntity<>(
                new SingleResponseDto<>(myStub), HttpStatus.CREATED);
//        return new ResponseEntity<>(memberMapper.memberToMemberMyResponse(member), HttpStatus.OK);
    }

    // 다른 회원 정보 확인
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") long memberId) {
//        Member member = memberService.findMember(memberId);
        MemberStubResponse.OtherStub otherStub = new MemberStubResponse.OtherStub();
        return new ResponseEntity<>(
                new SingleResponseDto<>(otherStub), HttpStatus.CREATED);
//        return new ResponseEntity<>(memberMapper.memberToMemberOtherResponse(member), HttpStatus.OK);
    }

    // 회원 탈퇴
    @PatchMapping("/my-page/{member-id}/withdraw")
    public ResponseEntity withdrawal(@PathVariable("member-id") long memberId) {
//        memberService.deleteMember(memberId);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
