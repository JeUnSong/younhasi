package com.younhasi.younhafancommunity.service.api.instagram;

import com.younhasi.younhafancommunity.domain.api.instagram.InstagramPost;
import com.younhasi.younhafancommunity.dto.api.instagram.InstagramRequest;
import com.younhasi.younhafancommunity.dto.api.instagram.InstagramResponse;
import com.younhasi.younhafancommunity.repository.InstagramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstagramServiceImpl implements InstagramService {

    private final InstagramRepository instagramRepository;

    @Override
    public void savePosts(List<InstagramRequest> postDtos) {
        for (InstagramRequest dto : postDtos) {
            if (!instagramRepository.existsByPostUrl(dto.getPostUrl())) {
                InstagramPost post = InstagramPost.builder()
                        .title(dto.getTitle())
                        .imageUrl(dto.getImageUrl())
                        .postUrl(dto.getPostUrl())
                        .createdAt(LocalDateTime.now())
                        .build();
                instagramRepository.save(post);
            }
        }
    }

    @Override
    public List<InstagramResponse> getLatestPosts(int count) {
        return instagramRepository.findAll(PageRequest.of(0, count, Sort.by(Sort.Direction.DESC, "createdAt")))
                .stream()
                .map(InstagramResponse::fromEntity)
                .collect(Collectors.toList());
    }
}

