//package com.main_001.server.auth.filter;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.main_001.server.auth.dto.LoginDto;
//import com.main_001.server.auth.jwt.JwtTokenizer;
//import com.main_001.server.member.entity.Member;
//import lombok.SneakyThrows;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//
//// 클라이언트의 로그인 인증 요청을 처리한다.
//public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
//    private final AuthenticationManager authenticationManager;
//    private final JwtTokenizer jwtTokenizer;
//
//    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
//        this.authenticationManager = authenticationManager;
//        this.jwtTokenizer = jwtTokenizer;
//    }
//
////     인증 시도
//    @SneakyThrows
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); // 역직렬화
//
//        UsernamePasswordAuthenticationToken authenticationToken =
//                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()); // 입력받은 ID, PW로 UsernamePasswordAuthenticationToken 생성
//
//        return authenticationManager.authenticate(authenticationToken); // AuthenticationManager에게 전달하면서 인증 처리를 위임
//    }
//
////     인증 성공시 호출
////    @Override
////    protected void successfulAuthentication(HttpServletRequest request,
////                                            HttpServletResponse response,
////                                            FilterChain chain,
////                                            Authentication authResult) {
////        Member member = (Member) authResult.getPrincipal();
////
////        String accessToken = delegateAccessToken(member);
////        String refreshToken = delegateRefreshToken(member);
////
////        response.setHeader("Authorization", "Bearer " + accessToken);
////        response.setHeader("Refresh", refreshToken);
////        response.addHeader("member-id", member.getMemberId().toString());
////        response.setHeader("user-id-set", user.getUserId().toString());
////    }
////
////     AccessToken 생성
////    private String delegateAccessToken(Member member) {
////        Map<String, Object> claims = new HashMap<>();
////        claims.put("username", member.getEmail());
////
////        String subject = member.getEmail();
////        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
////
////        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
////
////        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
////
////        return accessToken;
////    }
////
////     RefreshToken 생성
////    private String delegateRefreshToken(Member member) {
////        String subject = member.getEmail();
////        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
////        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
////
////        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
////
////        return refreshToken;
////    }
////}
