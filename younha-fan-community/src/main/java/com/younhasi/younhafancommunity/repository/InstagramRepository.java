package com.younhasi.younhafancommunity.repository;

import com.younhasi.younhafancommunity.domain.api.instagram.InstagramPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstagramRepository extends JpaRepository<InstagramPost, Long> {
    boolean existsByPostUrl(String postUrl);
}