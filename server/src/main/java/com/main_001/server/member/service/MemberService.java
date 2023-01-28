package com.main_001.server.member.service;

import com.main_001.server.auth.dto.LoginDto;
import com.main_001.server.auth.filter.JwtAuthenticationFilter;
import com.main_001.server.auth.jwt.JwtTokenizer;
import com.main_001.server.auth.utils.CustomAuthorityUtils;
import com.main_001.server.exception.BusinessLogicException;
import com.main_001.server.exception.ExceptionCode;
import com.main_001.server.file.FileHandler;
import com.main_001.server.file.UploadFile;
import com.main_001.server.member.dto.TokenDto;
import com.main_001.server.member.entity.Member;
import com.main_001.server.member.entity.MemberImage;
import com.main_001.server.member.entity.MemberTag;
import com.main_001.server.member.repository.MemberImageRepository;
import com.main_001.server.member.repository.MemberRepository;
import com.main_001.server.tag.repository.TagRepository;
import lombok.SneakyThrows;
import org.springframework.http.HttpHeaders;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtTokenizer jwtTokenizer;
    private final JavaMailSender mailSender;
    private final MemberImageRepository memberImageRepository;
    private final FileHandler fileHandler;
    private final TagRepository tagRepository;

//    @Value("${file.path}")
    private String memberImagePath;

    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils,
                         JwtTokenizer jwtTokenizer,
                         JavaMailSender mailSender,
                         MemberImageRepository memberImageRepository,
                         FileHandler fileHandler,
                         TagRepository tagRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.jwtTokenizer = jwtTokenizer;
        this.mailSender = mailSender;
        this.memberImageRepository = memberImageRepository;
        this.fileHandler = fileHandler;
        this.tagRepository = tagRepository;
    }

    // 이메일, 닉네임, 전화번호를 따로 검사하는 로직이 있기 때문에 회원가입은 바로 저장소에 저장될 수 있다.
    // TODO 탈퇴한 회원의 이메일, 닉네임, 전화번호까지 고려해서 체크해주어야 한다. entity에서 unique? or 다른 조건문
    public Member createMember(Member member) {
        // 비밀번호 암호화
        // TODO 개발 완료 후 봉인 해제
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // DB에 Member Role 저장
        // TODO 개발 완료 후 봉인 해제
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        // 존재하는 Tag인지 확인
        findVerifiedTag(member.getMemberTags());

//        MemberImage memberImageLocal = MemberImage.builder()
//                .filePath(memberImagePath)
//                .build();
//        member.addMemberImage(memberImageLocal);

        return memberRepository.save(member);
    }

    // 태그 존재 여부 확인
    private void findVerifiedTag(List<MemberTag> memberTags) {
        for (MemberTag memberTag : memberTags) {
            tagRepository.findById(memberTag.getTag().getTagId()).orElseThrow();
        }
    }

    // 프로필 이미지 생성
    @SneakyThrows
    @Transactional
    public void createImage(Long memberId, List<MultipartFile> multipartFiles) {
        Member findMember = findMember(memberId);

        List<UploadFile> uploadFiles = fileHandler.parseFileInfo(multipartFiles);
        List<MemberImage> memberImages = new ArrayList<>();

        uploadFiles.forEach(uploadFile -> {
            MemberImage memberImage = MemberImage.builder()
                    .originalFileName(uploadFile.getOriginalFileName())
                    .storedFileName(uploadFile.getStoredFileName())
                    .filePath(uploadFile.getFilePath())
                    .fileSize(uploadFile.getFileSize())
                    .build();
            memberImages.add(memberImage);
            memberImageRepository.save(memberImage); // 추후 수정 필요함
        });

        if (!memberImages.isEmpty()) {
            for (MemberImage memberImage : memberImages) {
                findMember.addMemberImage(memberImage);
                memberRepository.save(findMember); // 수정 필요
                break;
            }
        }
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
    public TokenDto.Response loginMember(LoginDto requestBody) {
        Member findMember = findMemberByEmail(requestBody.getEmail());
        isValid(findMember, requestBody.getPassword());

        String accessToken = jwtTokenizer.generateAccessToken(findMember);
        String refreshToken = jwtTokenizer.generateRefreshToken(findMember);

        // 헤더에 추가할 내용
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Refresh", refreshToken);
        headers.add("member-id", findMember.getMemberId().toString());
//        headers.add("Role", findMember.getRoles().toString());
        headers.add("heart", Integer.toString(findMember.getHeart()));
        headers.add("birth", findMember.getBirth());
        headers.add("sex", findMember.getSex());

        return TokenDto.Response
                .builder()
                .headers(headers)
                .build();
    }

    // 임시 비밀번호 발급
    public void sendMail(String email) {
        String tempPassword = getTempPassword();

        // 비밀번호를 변경해주어야 한다.
        // email로 User를 찾아서 저장
        Member findMember = findMemberByEmail(email);
        findMember.setPassword(passwordEncoder.encode(tempPassword));

//        TODO 비밀번호 변경(security 적용 후 주석 처리함)
//        findMember.setPassword(tempPassword);

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

//        findMember.setPassword(newPassword);

//        TODO 개발 완료 후 봉인 해제
        String encryptedPassword = passwordEncoder.encode(newPassword);
        findMember.setPassword(encryptedPassword);

        memberRepository.save(findMember);
    }

    // 마이페이지 수정 로직, tag는 하나씩만 존재하도록 체크 필요함
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getNickname())
                .ifPresent(findMember::setNickname);
        Optional.ofNullable(member.getPhone())
                .ifPresent(findMember::setPhone);
        Optional.ofNullable(member.getLocation())
                .ifPresent(findMember::setLocation);
        Optional.of(member.getLat())
                .ifPresent(findMember::setLat);
        Optional.of(member.getLon())
                .ifPresent(findMember::setLon);
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
        Member findMember = findVerifiedMember(memberId);
        findMember.setPassword("");
        findMember.setName("Member" + memberId);
        findMember.setSex("Deleted Member");

        memberRepository.save(findMember);
//        memberRepository.deleteById(memberId);
    }

    // 비밀번호가 맞는지 확인
    private void isValid(Member findMember, String password) {
//        if (!findMember.getPassword().equals(password))
//            throw new RuntimeException("Different Password!");

//        TODO 개발 완료 후 봉인 해제
        if (!passwordEncoder.matches(password, findMember.getPassword()))
            throw new BusinessLogicException(ExceptionCode.DIFFERENT_PASSWORD);
    }

    // 회원 id가 존재하는지 확인
    private Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    // 이메일에 해당하는 회원 반환
    private Member findMemberByEmail(String email) {
        Optional<Member> optionalUser = memberRepository.findByEmail(email);
        return optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
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
