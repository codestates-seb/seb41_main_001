package com.main_001.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedHeaders("*")
                .allowedOrigins("http://localhost:8080",
                        "http://localhost:3000",
                        "http://ec2-15-164-87-251.ap-northeast-2.compute.amazonaws.com:8080/",
                        "http://heart-main.s3-website.ap-northeast-2.amazonaws.com/") // 허용할 출처
                .allowedMethods(HttpMethod.GET.name(),
                        HttpMethod.HEAD.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.PATCH.name(),
                        HttpMethod.DELETE.name()) // 허용할 HTTP method
                .allowCredentials(true) // 쿠키 인증 요청 허용
                .exposedHeaders("*")
                .maxAge(3600L); // 원하는 시간만큼 pre-flight 리퀘스트를 캐싱
    }
}
