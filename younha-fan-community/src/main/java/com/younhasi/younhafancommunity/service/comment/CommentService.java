package com.younhasi.younhafancommunity.service.comment;

import com.younhasi.younhafancommunity.dto.comment.CommentRequest;
import com.younhasi.younhafancommunity.dto.comment.CommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {
    CommentResponse createComment(Long postId, CommentRequest request, Long userId);

    CommentResponse updateComment(Long commentId, CommentRequest request, Long userId);

    void deleteComment(Long commentId, Long userId);

    Page<CommentResponse> getComments(Long postId, Pageable pageable);
}