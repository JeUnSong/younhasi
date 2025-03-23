package com.younhasi.younhafancommunity.repository;

import com.younhasi.younhafancommunity.domain.comment.Comment;
import com.younhasi.younhafancommunity.domain.like.Likes;
import com.younhasi.younhafancommunity.domain.post.Post;
import com.younhasi.younhafancommunity.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByUserAndPost(User user, Post post);
    Optional<Likes> findByUserAndComment(User user, Comment comment);

    long countByPost(Post post);
    long countByComment(Comment comment);

    void deleteByUserAndPost(User user, Post post);
    void deleteByUserAndComment(User user, Comment comment);
}
