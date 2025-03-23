package com.younhasi.younhafancommunity.service.like;

public interface LikesService {
    void likePost(Long postId, Long userId);
    void unlikePost(Long postId, Long userId);
    long getPostLikeCount(Long postId);

    void likeComment(Long postId, Long commentId, Long userId);
    void unlikeComment(Long postId, Long commentId, Long userId);
    long getCommentLikeCount(Long postId, Long commentId);
}
