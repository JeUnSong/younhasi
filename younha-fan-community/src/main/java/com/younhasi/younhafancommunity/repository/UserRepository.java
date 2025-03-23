package com.younhasi.younhafancommunity.repository;

import com.younhasi.younhafancommunity.domain.user.SocialType;
import com.younhasi.younhafancommunity.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 이메일로 사용자 찾기 (로그인/중복검사용)
    Optional<User> findByEmail(String email);

    // 닉네임 중복검사 (선택)
    Optional<User> findByNickname(String nickname);

    Optional<User> findBySocialIdAndSocialType(String providerId, SocialType socialType);
}