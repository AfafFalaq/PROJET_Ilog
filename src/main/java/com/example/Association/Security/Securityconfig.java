package com.example.Association.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;



@Configuration
@EnableWebSecurity
public class Securityconfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws
            Exception {
        http.authorizeRequests()
                .anyRequest()
                .permitAll()
                .and()
                .csrf()
                .disable()
                .headers()
                .frameOptions()
                .disable();

        return http.build();
    }
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
