package com.younhasi.younhafancommunity.service.api.instagram;

import com.younhasi.younhafancommunity.dto.api.instagram.InstagramRequest;
import com.younhasi.younhafancommunity.dto.api.instagram.InstagramResponse;

import java.util.List;

public interface InstagramService {
    void savePosts(List<InstagramRequest> postDtos);
    List<InstagramResponse> getLatestPosts(int count);
}

