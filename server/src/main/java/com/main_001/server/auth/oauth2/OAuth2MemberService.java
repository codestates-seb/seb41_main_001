package com.main_001.server.auth.oauth2;


import com.main_001.server.auth.utils.CustomAuthorityUtils;
import com.main_001.server.exception.BusinessLogicException;
import com.main_001.server.exception.ExceptionCode;
import com.main_001.server.member.entity.Member;
import com.main_001.server.member.repository.MemberRepository;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class OAuth2MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    public OAuth2MemberService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    @SneakyThrows
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest); // accessToken을 받아서 서버로부터 사용자 정보를 받아온다.

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 현재 로그인을 진행중인 서비스를 구분하는 코드

        // OAuth2 로그인 진행 시 키가 되는 필드값을 의미 Primary Key와 같은 의미, 구글의 경우 코드를 지원하지만 네이버, 카카오 등은 지원하지 않음, 네이버 로그인과 구글 로그인을 동시 지원할 때 사용된다.
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuth2Attribute oAuth2Attribute = OAuth2Attribute.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        Member OAuth2Member = saveOrUpdate(oAuth2Attribute);
        List<GrantedAuthority> roles = authorityUtils.createAuthorities(OAuth2Member.getRoles());

        return new DefaultOAuth2User(roles, oAuth2Attribute.getAttributes(), oAuth2Attribute.getNameAttributeKey());
    }

    private Member saveOrUpdate(OAuth2Attribute attributes) {
        Optional<Member> optionalMember = memberRepository.findByEmail(attributes.getEmail());
        if (optionalMember.isPresent()) {
            log.info("OAuth2 기존 회원 계정 반환");

            // 기존 가입 회원의 경우 예외 발생
            Member member = optionalMember.get();
            if (member.getProvider() == null)
                throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_EXISTS);

            return member;
        }

        // 회원가입 시작(아예 기존 이메일과도 겹치지 않는 경우)
        List<String> roles = authorityUtils.createRoles(attributes.getEmail());

        // nickname, phone 처리(임시)
        String email = attributes.getEmail();
        String nickname = attributes.getProvider() + "_" + email.substring(0, email.indexOf("@"));

        String phone = email.substring(0, 14);

        Member member = Member.builder()
                .email(attributes.getEmail())
                .name(attributes.getName())
                .nickname(nickname)
                .phone(phone)
                .roles(roles)
                .picture(attributes.getPicture())
                .provider(attributes.getProvider())
                .sex(attributes.getGender())
                .heart(50)
                .build();

        return memberRepository.save(member);
    }
}
