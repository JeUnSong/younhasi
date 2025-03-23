package com.younhasi.younhafancommunity.controller.comment;

import com.younhasi.younhafancommunity.dto.comment.CommentRequest;
import com.younhasi.younhafancommunity.dto.comment.CommentResponse;
import com.younhasi.younhafancommunity.security.CustomUserDetails;
import com.younhasi.younhafancommunity.service.comment.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable Long postId,
            @RequestBody CommentRequest request,
            @AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(commentService.createComment(postId, request, user.getId()));
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponse> updateComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @RequestBody CommentRequest request,
            @AuthenticationPrincipal CustomUserDetails user) {

        CommentResponse response = commentService.updateComment(commentId, request, user.getId());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @AuthenticationPrincipal CustomUserDetails user) {

        commentService.deleteComment(commentId, user.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<CommentResponse>> getComments(
            @PathVariable Long postId,
            Pageable pageable) {

        Page<CommentResponse> response = commentService.getComments(postId, pageable);
        return ResponseEntity.ok(response);
    }
}