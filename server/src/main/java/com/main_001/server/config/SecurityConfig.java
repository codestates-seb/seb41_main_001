package com.main_001.server.config;

import com.main_001.server.auth.oauth2.OAuth2MemberService;
import com.main_001.server.auth.oauth2.OAuth2SuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity(debug = false) // debug 필요하면 true
public class SecurityConfig {
    private final OAuth2MemberService oAuth2MemberService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    public SecurityConfig(OAuth2MemberService oAuth2MemberService, OAuth2SuccessHandler oAuth2SuccessHandler) {
        this.oAuth2MemberService = oAuth2MemberService;
        this.oAuth2SuccessHandler = oAuth2SuccessHandler;
    }
//    private final JwtTokenizer jwtTokenizer;
//    private final CustomAuthorityUtils authorityUtils; // 추가
//
//    public SecurityConfig(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
//        this.jwtTokenizer = jwtTokenizer;
//        this.authorityUtils = authorityUtils;
//    }

    // HttpSecurity를 통해 HTTP 요청에 대한 보안 설정을 구성한다.

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().disable()
                .and()

                .csrf().disable()
                .cors().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .logout()
                .logoutSuccessUrl("/")
                .and()

                .formLogin().disable()
                .httpBasic().disable()
//                .apply(new CustomFilterConfigurer())
//                .and()
                .authorizeHttpRequests(authorize -> authorize
                        // member
//                        .antMatchers(HttpMethod.POST, "/members/profileImage").hasAuthority("ROLE_USER")
//                        .antMatchers(HttpMethod.DELETE, "/members/logout").hasAuthority("ROLE_USER")
//                        .antMatchers(HttpMethod.GET, "/members/re-issue").hasAuthority("ROLE_USER")
//                        .antMatchers(HttpMethod.PATCH, "/members/*").hasAuthority("ROLE_USER")
//                        .antMatchers(HttpMethod.GET, "/members/my-page").hasAuthority("ROLE_USER")
                        // free
//                        .antMatchers(HttpMethod.POST, "/freeboards/*").hasAuthority("ROLE_USER")
//                        .antMatchers(HttpMethod.PATCH, "/freeboards/*").hasAuthority("ROLE_USER")
//                        .antMatchers(HttpMethod.DELETE, "/freeboards/*").hasAuthority("ROLE_USER")
                        // recruit
//                        .antMatchers(HttpMethod.POST, "recruits/*").hasAuthority("ROLE_USER")
//                        .antMatchers(HttpMethod.PATCH, "/recruits/*").hasAuthority("ROLE_USER")
//                        .antMatchers(HttpMethod.DELETE, "recruits/*").hasAuthority("ROLE_USER")
                        // tag
//                        .antMatchers(HttpMethod.POST, "/tags").hasAuthority("ROLE_USER")
                        .antMatchers(
                                "/v3/api-docs",
                                "/swagger*/**").permitAll()
                        .anyRequest().permitAll() // 권한 설정 필요!
                )
                .oauth2Login(oAuth2 -> {
                    oAuth2.userInfoEndpoint().userService(oAuth2MemberService); // 로그인 성공시 해당 유저의 정보를 가지고 커스텀한 OAuth2MemberService에서 확인
                    oAuth2.successHandler(oAuth2SuccessHandler); // 인증 프로세스에 따라서 사용자 정의 로직 실행
                });

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // cors 설정 -> 제대로 작동하지 않아서 따로 config 만들어줌
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedOrigin("http://localhost:3000");
//        configuration.addAllowedOrigin("http://localhost:8080");
//        configuration.setAllowCredentials(true);
//        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

//    컨트롤러로 빼면서 제거된 부분
//    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
//        @Override
//        public void configure(HttpSecurity builder) {
//            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
//
//            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
//            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);
//
//            builder
//                    .addFilter(jwtAuthenticationFilter)
//                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
//        }
//    }
}
