package com.shoppingmallcoco.project.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}") // 프로퍼티 값 주입
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 이미지 파일 경로 설정
        registry.addResourceHandler("/images/**") // 웹 접근 경로
            .addResourceLocations("file:///" + uploadDir);

        // React 빌드 파일 서빙 설정 (정적 리소스)
        registry.addResourceHandler("/static/**")
            .addResourceLocations("classpath:/static/static/");
        
        // React 빌드 파일의 루트 리소스 (favicon, manifest 등)
        registry.addResourceHandler("/favicon.ico", "/manifest.json", "/logo*.png", "/robots.txt", "/asset-manifest.json", "/prd_placeholder.png")
            .addResourceLocations("classpath:/static/");
        
        // index.html 직접 접근
        registry.addResourceHandler("/index.html")
            .addResourceLocations("classpath:/static/index.html");
    }
}