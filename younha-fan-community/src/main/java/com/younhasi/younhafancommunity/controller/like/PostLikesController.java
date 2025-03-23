package com.younhasi.younhafancommunity.controller.like;

import com.younhasi.younhafancommunity.security.CustomUserDetails;
import com.younhasi.younhafancommunity.service.like.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/{postId}/likes")
@RequiredArgsConstructor
public class PostLikesController {

    private final LikesService likesService;

    // 게시글 좋아요
    @PostMapping
    public ResponseEntity<Void> likePost(
            @PathVariable Long postId,
            @AuthenticationPrincipal CustomUserDetails user) {
        likesService.likePost(postId, user.getId());
        return ResponseEntity.ok().build();
    }

    // 게시글 좋아요 취소
    @DeleteMapping
    public ResponseEntity<Void> unlikePost(
            @PathVariable Long postId,
            @AuthenticationPrincipal CustomUserDetails user) {
        likesService.unlikePost(postId, user.getId());
        return ResponseEntity.ok().build();
    }

    // 게시글 좋아요 개수 조회
    @GetMapping("/count")
    public ResponseEntity<Long> getPostLikeCount(@PathVariable Long postId) {
        return ResponseEntity.ok(likesService.getPostLikeCount(postId));
    }
}
