package com.younhasi.younhafancommunity.dto.api.instagram;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InstagramRequest {
    private String title;
    private String postUrl;
    private String imageUrl;

}
