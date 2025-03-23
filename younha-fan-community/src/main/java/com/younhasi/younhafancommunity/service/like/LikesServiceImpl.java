package com.younhasi.younhafancommunity.service.like;

import com.younhasi.younhafancommunity.domain.comment.Comment;
import com.younhasi.younhafancommunity.domain.like.Likes;
import com.younhasi.younhafancommunity.domain.post.Post;
import com.younhasi.younhafancommunity.domain.user.User;
import com.younhasi.younhafancommunity.repository.CommentRepository;
import com.younhasi.younhafancommunity.repository.LikesRepository;
import com.younhasi.younhafancommunity.repository.PostRepository;
import com.younhasi.younhafancommunity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikesServiceImpl implements LikesService {

    private final LikesRepository likesRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void likePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        if (likesRepository.findByUserAndPost(user, post).isPresent()) {
            throw new IllegalArgumentException("이미 좋아요를 눌렀습니다.");
        }

        Likes like = Likes.builder()
                .user(user)
                .post(post)
                .build();

        likesRepository.save(like);
    }

    @Override
    @Transactional
    public void unlikePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        Likes like = likesRepository.findByUserAndPost(user, post)
                .orElseThrow(() -> new IllegalArgumentException("좋아요를 누르지 않았습니다."));

        likesRepository.delete(like);
    }

    @Override
    @Transactional(readOnly = true)
    public long getPostLikeCount(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));
        return likesRepository.countByPost(post);
    }

    // 댓글 좋아요 기능 추가
    @Override
    @Transactional
    public void likeComment(Long postId, Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        if (likesRepository.findByUserAndComment(user, comment).isPresent()) {
            throw new IllegalArgumentException("이미 좋아요를 눌렀습니다.");
        }

        Likes like = Likes.builder()
                .user(user)
                .comment(comment)
                .build();

        likesRepository.save(like);
    }

    @Override
    @Transactional
    public void unlikeComment(Long postId, Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        Likes like = likesRepository.findByUserAndComment(user, comment)
                .orElseThrow(() -> new IllegalArgumentException("좋아요를 누르지 않았습니다."));

        likesRepository.delete(like);
    }

    @Override
    @Transactional(readOnly = true)
    public long getCommentLikeCount(Long postId, Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다."));
        return likesRepository.countByComment(comment);
    }
}
