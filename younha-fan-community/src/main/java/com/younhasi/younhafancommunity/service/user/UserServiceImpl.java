package com.younhasi.younhafancommunity.service.user;

import com.younhasi.younhafancommunity.domain.user.SocialType;
import com.younhasi.younhafancommunity.domain.user.User;
import com.younhasi.younhafancommunity.dto.user.UserLoginRequest;
import com.younhasi.younhafancommunity.dto.user.UserLoginResponse;
import com.younhasi.younhafancommunity.dto.user.UserSignupRequest;
import com.younhasi.younhafancommunity.dto.user.UserSignupResponse;
import com.younhasi.younhafancommunity.repository.UserRepository;
import com.younhasi.younhafancommunity.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public UserSignupResponse signup(UserSignupRequest request) {

        // 이메일 중복 체크
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 사용중인 이메일입니다.");
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // 소셜 타입 기본값 처리
        Set<String> socialType = (request.getSocialType() == null || request.getSocialType().isEmpty())
                ? new HashSet<>(Collections.singletonList(SocialType.LOCAL.name()))
                : request.getSocialType().stream()
                .map(String::toUpperCase)
                .collect(Collectors.toSet());

        // 엔티티 생성
        User user = User.builder()
                .email(request.getEmail())
                .password(encodedPassword)
                .nickname(request.getNickname())
                .profileImage(request.getProfileImage())
                .socialType(socialType)
                .role("USER")
                .build();

        // 저장
        User savedUser = userRepository.save(user);

        // 응답 반환
        return new UserSignupResponse(savedUser.getId(), savedUser.getEmail(), savedUser.getNickname());
    }

    @Override
    public UserLoginResponse login(UserLoginRequest request) {
        // 이메일로 유저 조회
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        // 비밀번호 검사
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // JWT 토큰 발급
        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail());

        return new UserLoginResponse(token);
    }
}
