package com.younhasi.younhafancommunity.security;

import com.younhasi.younhafancommunity.domain.user.User;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collections;
import java.util.Map;

@Getter
public class CustomOAuth2User extends DefaultOAuth2User {
    private final User user;

    public CustomOAuth2User(User user) {
        super(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                Map.of("email", user.getEmail(), "nickname", user.getNickname()), "email");
        this.user = user;
    }

}

