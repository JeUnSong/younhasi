package com.younhasi.younhafancommunity.dto.api.instagram;

import com.younhasi.younhafancommunity.domain.api.instagram.InstagramPost;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstagramResponse {
    private String title;
    private String postUrl;
    private String imageUrl;

    public static InstagramResponse fromEntity(InstagramPost post) {
        return InstagramResponse.builder()
                .title(post.getTitle())
                .postUrl(post.getPostUrl())
                .imageUrl(post.getImageUrl())
                .build();
    }
}