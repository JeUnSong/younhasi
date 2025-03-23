package com.younhasi.younhafancommunity.service.post;

import com.younhasi.younhafancommunity.domain.post.BoardType;
import com.younhasi.younhafancommunity.domain.post.Post;
import com.younhasi.younhafancommunity.domain.user.User;
import com.younhasi.younhafancommunity.dto.post.PostCreateRequest;
import com.younhasi.younhafancommunity.dto.post.PostResponse;
import com.younhasi.younhafancommunity.dto.post.PostUpdateRequest;
import com.younhasi.younhafancommunity.repository.PostRepository;
import com.younhasi.younhafancommunity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    @Override
    public PostResponse createPost(PostCreateRequest request, Long userId) {

        // 1. User 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        // 2. Post 생성
        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .boardType(BoardType.from(request.getBoardType())) // Enum 변환
                .user(user) // User 객체 연결
                .build();

        // 3. 저장
        Post saved = postRepository.save(post);

        // 4. 반환
        return PostResponse.from(saved); // from 메서드로 변환
    }

    @Override
    @Transactional
    public PostResponse updatePost(Long postId, PostUpdateRequest request, Long userId) {
        // 1. 게시글 찾기
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        // 2. 작성자 본인만 수정 가능
        if (!post.getUser().getId().equals(userId)) {
            throw new SecurityException("게시글 수정 권한이 없습니다.");
        }

        // 3. 수정 적용
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());

        return PostResponse.from(post);
    }

    @Override
    @Transactional
    public void deletePost(Long postId, Long userId) {
        // 1. 게시글 찾기
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        // 2. 작성자 본인만 삭제 가능
        if (!post.getUser().getId().equals(userId)) {
            throw new SecurityException("게시글 삭제 권한이 없습니다.");
        }

        // 3. 게시글 삭제
        postRepository.delete(post);
    }

    @Override
    @Transactional(readOnly = true)
    public PostResponse getPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));
        return PostResponse.from(post);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostResponse> getPostList(String boardType, Pageable pageable) {
        Page<Post> posts;

        if (boardType != null) {
            // 특정 게시판의 글만 조회
            posts = postRepository.findByBoardType(BoardType.valueOf(boardType), pageable);
        } else {
            // 전체 게시글 조회 (최신순)
            posts = postRepository.findAll(pageable);
        }

        return posts.map(PostResponse::from);
    }
}
