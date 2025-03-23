package com.younhasi.younhafancommunity.service.comment;

import com.younhasi.younhafancommunity.domain.comment.Comment;
import com.younhasi.younhafancommunity.domain.post.Post;
import com.younhasi.younhafancommunity.domain.user.User;
import com.younhasi.younhafancommunity.dto.comment.CommentRequest;
import com.younhasi.younhafancommunity.dto.comment.CommentResponse;
import com.younhasi.younhafancommunity.repository.CommentRepository;
import com.younhasi.younhafancommunity.repository.PostRepository;
import com.younhasi.younhafancommunity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public CommentResponse createComment(Long postId, CommentRequest request, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        Comment comment = Comment.builder()
                .post(post)
                .user(user)
                .content(request.getContent())
                .build();

        commentRepository.save(comment);
        return CommentResponse.from(comment);
    }

    @Override
    @Transactional
    public CommentResponse updateComment(Long commentId, CommentRequest request, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다."));

        if (!comment.getUser().getId().equals(userId)) {
            throw new SecurityException("댓글 수정 권한이 없습니다.");
        }

        comment.setContent(request.getContent());
        return CommentResponse.from(comment);
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다."));

        if (!comment.getUser().getId().equals(userId)) {
            throw new SecurityException("댓글 삭제 권한이 없습니다.");
        }

        commentRepository.delete(comment);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CommentResponse> getComments(Long postId, Pageable pageable) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));
        return commentRepository.findByPost(post, pageable).map(CommentResponse::from);
    }
}