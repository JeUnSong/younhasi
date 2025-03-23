package com.younhasi.younhafancommunity.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignupRequest {

    private String email;
    private String password;
    private String nickname;
    private String profileImage; // 선택적
    private Set<String> socialType; // 기본은 LOCAL

}