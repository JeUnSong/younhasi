package com.younhasi.younhafancommunity.repository;

import com.younhasi.younhafancommunity.domain.comment.Comment;
import com.younhasi.younhafancommunity.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByPost(Post post, Pageable pageable);
}