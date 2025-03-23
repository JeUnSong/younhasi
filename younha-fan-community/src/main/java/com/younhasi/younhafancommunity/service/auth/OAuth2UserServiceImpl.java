package com.younhasi.younhafancommunity.service.auth;

import com.younhasi.younhafancommunity.domain.user.SocialType;
import com.younhasi.younhafancommunity.domain.user.User;
import com.younhasi.younhafancommunity.repository.UserRepository;
import com.younhasi.younhafancommunity.security.JwtTokenProvider;
import com.younhasi.younhafancommunity.security.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImpl implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = new DefaultOAuth2UserService().loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerId = getProviderId(provider, oAuth2User);
        String email = getEmail(provider, oAuth2User);
        String nickname = getNickname(provider, oAuth2User);
        String profileImage = getProfileImage(provider, oAuth2User);

        // 회원 통합: 이메일을 기준으로 기존 사용자 찾기
        User user = userRepository.findByEmail(email)
                .map(existingUser -> updateSocialAccount(existingUser, provider, providerId))
                .orElseGet(() -> createNewUser(email, nickname, profileImage, provider, providerId));

        return new CustomOAuth2User(user);
    }

    // 기존 계정이 있다면 소셜 계정 업데이트 (회원 통합)
    private User updateSocialAccount(User user, String provider, String providerId) {
        if (!user.getSocialType().contains(provider)) {
            user.getSocialType().add(provider);  // 기존 계정에 소셜 로그인 추가
            user.getSocialId().put(provider, providerId);
            return userRepository.save(user);
        }
        return user;
    }

    // 기존 계정이 없으면 새 계정 생성
    private User createNewUser(String email, String nickname, String profileImage, String provider, String providerId) {
        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(UUID.randomUUID().toString())) // 랜덤 비밀번호 생성
                .nickname(nickname)
                .profileImage(profileImage)
                .socialType(new HashSet<>(List.of(provider)))  // 소셜 계정 리스트
                .socialId(new HashMap<>(Map.of(provider, providerId))) // 소셜 ID 리스트
                .role("USER")
                .build();
        return userRepository.save(user);
    }

    private String getProviderId(String provider, OAuth2User oAuth2User) {
        if (provider.equals("naver")) {
            return ((Map<String, Object>) oAuth2User.getAttribute("response")).get("id").toString();
        } else if (provider.equals("kakao")) {
            return oAuth2User.getAttribute("id").toString();
        }
        return oAuth2User.getAttribute("sub"); // Google
    }

    private String getEmail(String provider, OAuth2User oAuth2User) {
        if (provider.equals("naver")) {
            return ((Map<String, Object>) oAuth2User.getAttribute("response")).get("email").toString();
        } else if (provider.equals("kakao")) {
            return ((Map<String, Object>) oAuth2User.getAttribute("kakao_account")).get("email").toString();
        }
        return oAuth2User.getAttribute("email"); // Google
    }

    private String getNickname(String provider, OAuth2User oAuth2User) {
        if (provider.equals("naver")) {
            return ((Map<String, Object>) oAuth2User.getAttribute("response")).get("nickname").toString();
        } else if (provider.equals("kakao")) {
            return ((Map<String, Object>) oAuth2User.getAttribute("properties")).get("nickname").toString();
        }
        return oAuth2User.getAttribute("name"); // Google
    }

    private String getProfileImage(String provider, OAuth2User oAuth2User) {
        if (provider.equals("naver")) {
            return ((Map<String, Object>) oAuth2User.getAttribute("response")).get("profile_image").toString();
        } else if (provider.equals("kakao")) {
            return ((Map<String, Object>) oAuth2User.getAttribute("properties")).get("profile_image").toString();
        }
        return oAuth2User.getAttribute("picture"); // Google
    }
}


