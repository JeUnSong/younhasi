package com.younhasi.younhafancommunity.controller.api.youtube;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/youtube")
@RequiredArgsConstructor
public class YouTubeController {

    @Value("${youtube.api.key}")
    private String apiKey;

    @Value("${youtube.channel.id}")
    private String channelId;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/latest")
    public ResponseEntity<String> getRegularVideos() throws Exception {
        return fetchVideos(false, 3); // 일반 영상 3개
    }

    @GetMapping("/shorts")
    public ResponseEntity<String> getShortsVideos() throws Exception {
        return fetchVideos(true, 6); // 숏츠 6개
    }

    private ResponseEntity<String> fetchVideos(boolean isShorts, int maxCount) throws Exception {
        String searchUrl = "https://www.googleapis.com/youtube/v3/search" +
                "?key=" + apiKey +
                "&channelId=" + channelId +
                "&part=snippet,id&order=date&type=video&maxResults=50";

        String searchResponse = restTemplate.getForObject(searchUrl, String.class);
        JsonNode searchJson = objectMapper.readTree(searchResponse);

        List<String> videoIds = new ArrayList<>();
        for (JsonNode item : searchJson.get("items")) {
            if (item.has("id") && item.get("id").has("videoId")) {
                videoIds.add(item.get("id").get("videoId").asText());
            }
        }

        String detailsUrl = "https://www.googleapis.com/youtube/v3/videos" +
                "?key=" + apiKey +
                "&part=snippet,contentDetails" +
                "&id=" + String.join(",", videoIds);

        String detailsResponse = restTemplate.getForObject(detailsUrl, String.class);
        JsonNode detailsJson = objectMapper.readTree(detailsResponse);

        List<JsonNode> filtered = new ArrayList<>();

        for (JsonNode item : detailsJson.get("items")) {
            String durationStr = item.get("contentDetails").get("duration").asText();
            long millis = javax.xml.datatype.DatatypeFactory.newInstance()
                    .newDuration(durationStr)
                    .getTimeInMillis(new Date());

            boolean isShort = (millis / 1000) <= 60;
            String title = item.get("snippet").get("title").asText().toLowerCase();
            boolean hasShorts486InTitle = title.contains("shorts 486");

            if (isShorts) {
                if (isShort && hasShorts486InTitle) {
                    filtered.add(item);
                }
            } else {
                if (!isShort || !hasShorts486InTitle) {
                    filtered.add(item);
                }
            }

            if (filtered.size() >= maxCount) break;
        }

        String finalJson = objectMapper.writeValueAsString(filtered);
        return ResponseEntity.ok(finalJson);
    }
}