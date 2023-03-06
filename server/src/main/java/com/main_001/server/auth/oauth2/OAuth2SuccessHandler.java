package com.main_001.server.auth.oauth2;

import com.main_001.server.auth.exception.AuthException;
import com.main_001.server.auth.jwt.JwtTokenizer;
import com.main_001.server.auth.utils.RedisUtils;
import com.main_001.server.exception.ExceptionCode;
import com.main_001.server.member.entity.Member;
import com.main_001.server.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.HttpHeaders;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Map;

@Slf4j
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;
    private final RedisUtils redisUtils;

    public OAuth2SuccessHandler(JwtTokenizer jwtTokenizer,
                                MemberRepository memberRepository,
                                RedisUtils redisUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberRepository = memberRepository;
        this.redisUtils = redisUtils;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2AuthenticationToken provider = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal(); // login한 사용자 목록
        String registrationId = provider.getAuthorizedClientRegistrationId();

        String email;

        // kakao의 경우 email을 가져오는 과정이 다른 클라이언트와 차이가 있다.
        if (registrationId.equals("kakao")) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
            email = String.valueOf(kakaoAccount.get("email"));
            log.info("kakao login !");
        } else {
            email = String.valueOf(oAuth2User.getAttributes().get("email"));
        }

        Member member = memberRepository.findByEmailAndProvider(email, registrationId)
                .orElseThrow(() -> new AuthException(ExceptionCode.MEMBER_NOT_FOUND));

        redirect(request, response, member);

//        redirect(request, response, email, registrationId);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member) throws IOException {
        // access token 생성
        String accessToken = jwtTokenizer.generateAccessToken(member);

        // refresh token 생성 및 redis 저장
        String refreshToken = jwtTokenizer.generateRefreshToken(member);
        redisUtils.setData(refreshToken, member.getMemberId(), jwtTokenizer.getRefreshTokenExpirationMinutes());

        // 헤더에 담아서 보내기
        response.addHeader("Authorization", "Bearer " + accessToken);
        response.addHeader("Refresh", refreshToken);
        response.addHeader("member-id", member.getMemberId().toString());
        response.addHeader("heart", Integer.toString(member.getHeart()));
        response.addHeader("birth", member.getBirth());
        response.addHeader("sex", member.getSex());

        String uri = createURI(accessToken, refreshToken, member.getProvider()).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

//    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, String registrationId) throws IOException {
//        Member member = memberRepository.findByEmail(username)
//                .orElseThrow(() -> new AuthException(ExceptionCode.MEMBER_NOT_FOUND));
//
//        // access token 생성
//        String accessToken = jwtTokenizer.generateAccessToken(member);
//
//        // refresh token 생성 및 redis 저장
//        String refreshToken = jwtTokenizer.generateRefreshToken(member);
//        redisUtils.setData(refreshToken, member.getMemberId(), jwtTokenizer.getRefreshTokenExpirationMinutes());
//
//        String uri = createURI(accessToken, refreshToken, registrationId).toString();
//        getRedirectStrategy().sendRedirect(request, response, uri);
//
//        log.info("Login Success");
//    }

    // OAuth2 인증 업체를 추가하면 파라미터(provider)를 추가해서 경우에 따라 uri를 연결해주어야 한다.(프론트 url로 주소를 잡아주어야 한다.)
    private URI createURI(String accessToken, String refreshToken, String provider) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("Authorization", "Bearer " + accessToken);
        queryParams.add("Refresh", refreshToken);

//        return UriComponentsBuilder // 일단 메인 페이지로 넘어갈 수 있도록 만들기
//                .newInstance()
//                .scheme("https")
//                .host("heartone.site")
//                .port(443)
//                .path("/token")
//                .queryParams(queryParams)
//                .build()
//                .toUri();

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(3000)
                .path("/my-page")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
