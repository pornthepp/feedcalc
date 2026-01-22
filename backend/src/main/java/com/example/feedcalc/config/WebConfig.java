package com.example.feedcalc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // อนุญาตทุก Path ใน API ของเรา
                .allowedOrigins(
                        "http://localhost:5173",          // สำหรับรันในเครื่องตัวเอง
                        "https://feedcalc.netlify.app"    // สำหรับรันจริงบน Netlify (ต้องใส่ URL นี้)
                )
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // อนุญาตทุกเมธอดที่คุณใช้
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}