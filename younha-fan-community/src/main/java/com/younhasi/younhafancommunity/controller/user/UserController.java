package com.younhasi.younhafancommunity.controller.user;

import com.younhasi.younhafancommunity.dto.user.UserLoginRequest;
import com.younhasi.younhafancommunity.dto.user.UserLoginResponse;
import com.younhasi.younhafancommunity.dto.user.UserSignupRequest;
import com.younhasi.younhafancommunity.dto.user.UserSignupResponse;
import com.younhasi.younhafancommunity.security.CustomUserDetails;
import com.younhasi.younhafancommunity.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입 API
    @PostMapping("/signup")
    public ResponseEntity<UserSignupResponse> signup(@RequestBody UserSignupRequest request) {
        UserSignupResponse response = userService.signup(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest request) {
        UserLoginResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<String> getMyInfo( @AuthenticationPrincipal CustomUserDetails user) {
        Long userId = user.getId();
        return ResponseEntity.ok("내 유저 ID: " + userId);
    }
}
