package com.younhasi.younhafancommunity.controller.like;

import com.younhasi.younhafancommunity.security.CustomUserDetails;
import com.younhasi.younhafancommunity.service.like.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/{postId}/comments/{commentId}/likes")
@RequiredArgsConstructor
public class CommentLikesController {

    private final LikesService likesService;

    // 댓글 좋아요
    @PostMapping
    public ResponseEntity<Void> likeComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @AuthenticationPrincipal CustomUserDetails user) {
        likesService.likeComment(postId, commentId, user.getId());
        return ResponseEntity.ok().build();
    }

    // 댓글 좋아요 취소
    @DeleteMapping
    public ResponseEntity<Void> unlikeComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @AuthenticationPrincipal CustomUserDetails user) {
        likesService.unlikeComment(postId, commentId, user.getId());
        return ResponseEntity.ok().build();
    }

    // 댓글 좋아요 개수 조회
    @GetMapping("/count")
    public ResponseEntity<Long> getCommentLikeCount(
            @PathVariable Long postId,
            @PathVariable Long commentId) {
        return ResponseEntity.ok(likesService.getCommentLikeCount(postId, commentId));
    }
}
