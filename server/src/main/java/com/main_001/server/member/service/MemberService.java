package com.main_001.server.member.service;

import com.main_001.server.auth.dto.LoginDto;
import com.main_001.server.auth.jwt.JwtTokenizer;
//import com.main_001.server.auth.utils.CustomAuthorityUtils;
import com.main_001.server.member.dto.TokenDto;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import com.main_001.server.member.entity.Member;
import com.main_001.server.member.repository.MemberRepository;
import org.springframework.http.HttpHeaders;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final CustomAuthorityUtils authorityUtils;
//    private final JwtTokenizer jwtTokenizer;
    private final JavaMailSender mailSender;

    public MemberService(MemberRepository memberRepository,
//                         PasswordEncoder passwordEncoder,
//                         CustomAuthorityUtils authorityUtils,
//                         JwtTokenizer jwtTokenizer,
                         JavaMailSender mailSender) {
        this.memberRepository = memberRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.authorityUtils = authorityUtils;
//        this.jwtTokenizer = jwtTokenizer;
        this.mailSender = mailSender;
    }

    // 이메일, 닉네임, 전화번호를 따로 검사하는 로직이 있기 때문에 회원가입은 바로 저장소에 저장될 수 있다.
    // TODO 탈퇴한 회원의 이메일, 닉네임, 전화번호까지 고려해서 체크해주어야 한다. entity에서 unique? or 다른 조건문
    public Member createMember(Member member) {
        // 비밀번호 암호화
        // TODO 개발 완료 후 봉인 해제
//        String encryptedPassword = passwordEncoder.encode(member.getPassword());
//        member.setPassword(encryptedPassword);

        // DB에 Member Role 저장
        // TODO 개발 완료 후 봉인 해제
//        List<String> roles = authorityUtils.createRoles(member.getEmail());
//        member.setRoles(roles);

        return memberRepository.save(member);
    }

    // 이메일 중복여부 중복이면 true, 중복이 아니면 false
    public boolean checkEmailDuplication(String email) {
        return memberRepository.existsByEmail(email);
    }

    // 닉네임 중복여부 중복이면 true, 중복이 아니면 false
    public boolean checkNicknameDuplication(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    // 전화번호 중복여부 중복이면 true, 중복이 아니면 false
    public boolean checkPhoneDuplication(String phone) {
        return memberRepository.existsByPhone(phone);
    }

    // 로그인 로직
    // mapper 사용해볼 것
    // TODO 개발 완료 후 봉인 해제
//    public TokenDto.Response loginMember(LoginDto requestBody) {
//        Member findMember = findMemberByEmail(requestBody.getEmail());
//        isValid(findMember, requestBody.getPassword());
//
//        String accessToken = jwtTokenizer.generateAccessToken(findMember);
//        String refreshToken = jwtTokenizer.generateRefreshToken(findMember);
//
//        // 헤더에 추가할 내용
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorizaion", "Bearer " + accessToken);
//        headers.add("Refresh", refreshToken);
//        headers.add("member-id", findMember.getMemberId().toString());
//        headers.add("Role", findMember.getRoles().toString());
//
//        return TokenDto.Response
//                .builder()
//                .headers(headers)
//                .build();
//    }

    // 임시 비밀번호 발급
    public void sendMail(String email) {
        String tempPassword = getTempPassword();

        // 비밀번호를 변경해주어야 한다.
        // email로 User를 찾아서 저장
        Member findMember = findMemberByEmail(email);

        findMember.setPassword(tempPassword);

//        TODO 비밀번호 변경(security 적용 후 아래 코드로 변경)
//        findMember.setPassword(passwordEncoder.encode(tempPassword));

        memberRepository.save(findMember);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no_reply@canyoufeelmyheartbeat.com");
        message.setTo(email);
        message.setSubject("[HEART] 임시 비밀번호 안내입니다.");
        message.setText(
                "귀하의 임시 비밀번호는 " + tempPassword + "입니다. \n해당 비밀번호로 로그인하세요."
        );
        mailSender.send(message);
    }

    // 비밀번호가 맞는지 확인
    public void checkPassword(long memberId, String curPassword, String newPassword) {
        Member findMember = findVerifiedMember(memberId);
        isValid(findMember, curPassword);

        findMember.setPassword(newPassword);

//        TODO 개발 완료 후 봉인 해제
//        String encryptedPassword = passwordEncoder.encode(newPassword);
//        findMember.setPassword(encryptedPassword);

        memberRepository.save(findMember);
    }

    // 마이페이지 수정 로직
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getNickname())
                .ifPresent(findMember::setNickname);
        Optional.ofNullable(member.getPhone())
                .ifPresent(findMember::setPhone);
        Optional.ofNullable(member.getLocationGroupString())
                .ifPresent(findMember::setLocationGroupString);
        Optional.ofNullable(member.getMemberTags())
                .ifPresent(findMember::setMemberTags);

        return memberRepository.save(findMember);
    }

    // 회원 조회
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    // 회원 탈퇴
    public void deleteMember(long memberId) {
        memberRepository.deleteById(memberId);
    }

    // 비밀번호가 맞는지 확인
    private void isValid(Member findMember, String password) {
        if (!findMember.getPassword().equals(password))
            throw new RuntimeException("Different Password!");

//        TODO 개발 완료 후 봉인 해제
//        if (!passwordEncoder.matches(password, findMember.getPassword()))
//            throw new RuntimeException("Different Password!");
    }

    // 회원 id가 존재하는지 확인
    private Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                new RuntimeException("Member not found"));
    }

    // 이메일에 해당하는 회원 반환
    private Member findMemberByEmail(String email) {
        Optional<Member> optionalUser = memberRepository.findByEmail(email);
        return optionalUser.orElseThrow(() ->
                new RuntimeException("Member not found"));
    }

    // 임시 비밀번호 생성
    private String getTempPassword() {
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        StringBuilder str = new StringBuilder();

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str.append(charSet[idx]);
        }
        return str.toString();
    }
}
