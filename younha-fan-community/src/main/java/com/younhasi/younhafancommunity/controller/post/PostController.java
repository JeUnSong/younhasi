package com.younhasi.younhafancommunity.controller.post;

import com.younhasi.younhafancommunity.dto.post.PostCreateRequest;
import com.younhasi.younhafancommunity.dto.post.PostResponse;
import com.younhasi.younhafancommunity.dto.post.PostUpdateRequest;
import com.younhasi.younhafancommunity.security.CustomUserDetails;
import com.younhasi.younhafancommunity.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostCreateRequest request,
                                                   @AuthenticationPrincipal CustomUserDetails user) {
        PostResponse response = postService.createPost(request, user.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable Long postId,
                                                   @RequestBody PostUpdateRequest request,
                                                   @AuthenticationPrincipal CustomUserDetails user) {
        PostResponse response = postService.updatePost(postId, request, user.getId());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId,
                                           @AuthenticationPrincipal CustomUserDetails user) {
        postService.deletePost(postId, user.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long postId) {
        PostResponse response = postService.getPost(postId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<PostResponse>> getPostList(
            @RequestParam(required = false) String boardType,
            Pageable pageable) {

        Page<PostResponse> response = postService.getPostList(boardType, pageable);
        return ResponseEntity.ok(response);
    }
}
