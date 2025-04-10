package com.younhasi.younhafancommunity.controller.api.youtube;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/youtube")
@RequiredArgsConstructor
public class YouTubeController {

    @Value("${youtube.api.key}")
    private String apiKey;

    @Value("${youtube.channel.id}")
    private String channelId;

    private final RestTemplate restTemplate;

    @GetMapping("/latest")
    public ResponseEntity<String> getLatestVideo() {
        String url = "https://www.googleapis.com/youtube/v3/search" +
                "?key=" + apiKey +
                "&channelId=" + channelId +
                "&part=snippet,id&order=date&maxResults=3";

        String response = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(response);
    }
}
