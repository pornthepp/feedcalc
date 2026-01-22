package com.example.feedcalc.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // อนุญาตทุก Path ใน API
                .allowedOrigins(
                        "http://localhost:5173",          // สำหรับตอนรันในเครื่อง (Vite)
                        "https://your-site.netlify.app"   // สำหรับตอนรันจริงบน Netlify
                )
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // อนุญาตทุก Method
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}