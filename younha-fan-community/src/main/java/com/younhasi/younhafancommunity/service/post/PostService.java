package com.younhasi.younhafancommunity.service.post;

import com.younhasi.younhafancommunity.dto.post.PostCreateRequest;
import com.younhasi.younhafancommunity.dto.post.PostResponse;
import com.younhasi.younhafancommunity.dto.post.PostUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {

    PostResponse createPost(PostCreateRequest request, Long userId);

    PostResponse updatePost(Long postId, PostUpdateRequest request, Long userId);

    void deletePost(Long postId, Long userId);

    PostResponse getPost(Long postId);

    Page<PostResponse> getPostList(String boardType, Pageable pageable);
}