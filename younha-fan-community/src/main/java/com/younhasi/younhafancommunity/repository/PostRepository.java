package com.younhasi.younhafancommunity.repository;

import com.younhasi.younhafancommunity.domain.post.BoardType;
import com.younhasi.younhafancommunity.domain.post.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByBoardType(BoardType boardType, Pageable pageable);
}