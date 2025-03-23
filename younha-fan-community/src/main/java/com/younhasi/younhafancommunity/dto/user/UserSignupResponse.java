package com.younhasi.younhafancommunity.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignupResponse {
    private Long id;
    private String email;
    private String nickname;
}