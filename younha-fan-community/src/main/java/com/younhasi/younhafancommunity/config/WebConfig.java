package com.younhasi.younhafancommunity.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 요청 경로에 대해
                .allowedOrigins("http://localhost:3000") // Next.js 주소
                .allowedMethods("*") // GET, POST 등 모든 메서드 허용
                .allowCredentials(true); // 쿠키/세션 허용 시 필요
    }
}