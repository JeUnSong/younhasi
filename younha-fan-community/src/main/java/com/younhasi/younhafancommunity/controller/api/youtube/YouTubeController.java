package com.younhasi.younhafancommunity.controller.api.youtube;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.xml.datatype.DatatypeFactory;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

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

    // 캐시 저장소
    private final Map<String, CachedResponse> cache = new ConcurrentHashMap<>();

    // 캐시 유지 시간 (초 단위) - 1시간
    private static final long CACHE_TTL = 3600;

    @GetMapping("/latest")
    public ResponseEntity<String> getRegularVideos() throws Exception {
        return getCachedOrFetch("latest", false, 3); // 일반 영상 3개
    }

    @GetMapping("/shorts")
    public ResponseEntity<String> getShortsVideos() throws Exception {
        return getCachedOrFetch("shorts", true, 6); // 숏츠 영상 6개
    }

    // 캐시 확인 및 새 요청 처리
    private ResponseEntity<String> getCachedOrFetch(String key, boolean isShorts, int maxCount) throws Exception {
        CachedResponse cached = cache.get(key);

        if (cached != null && !cached.isExpired()) {
            return ResponseEntity.ok(cached.body);
        }

        String newBody = fetchVideos(isShorts, maxCount);
        cache.put(key, new CachedResponse(newBody));
        return ResponseEntity.ok(newBody);
    }

    // 유튜브 API 호출
    private String fetchVideos(boolean isShorts, int maxCount) throws Exception {
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

        List<JsonNode> resultList = new ArrayList<>();

        for (JsonNode item : detailsJson.get("items")) {
            String durationStr = item.get("contentDetails").get("duration").asText();
            long millis = DatatypeFactory.newInstance()
                    .newDuration(durationStr)
                    .getTimeInMillis(new Date());

            boolean isShort = (millis / 1000) <= 60;
            String title = item.get("snippet").get("title").asText().toLowerCase();
            boolean hasShorts486InTitle = title.contains("shorts 486");

            boolean shouldInclude = isShorts
                    ? (isShort && hasShorts486InTitle)
                    : (!isShort || !hasShorts486InTitle);

            if (shouldInclude) {
                ObjectNode simplified = objectMapper.createObjectNode();
                simplified.put("id", item.get("id").asText());
                simplified.put("title", item.get("snippet").get("title").asText());
                simplified.put("thumbnail", getBestThumbnail(item.get("snippet").get("thumbnails")));
                resultList.add(simplified);
            }

            if (resultList.size() >= maxCount) break;
        }

        return objectMapper.writeValueAsString(resultList);
    }

    // 썸네일 우선순위 선택
    private String getBestThumbnail(JsonNode thumbnailsNode) {
        List<String> priority = Arrays.asList("maxres", "standard", "high", "medium", "default");
        for (String key : priority) {
            if (thumbnailsNode.has(key)) {
                return thumbnailsNode.get(key).get("url").asText();
            }
        }
        return "";
    }

    // 캐시 객체
    private static class CachedResponse {
        String body;
        Instant timestamp;

        CachedResponse(String body) {
            this.body = body;
            this.timestamp = Instant.now();
        }

        boolean isExpired() {
            return Instant.now().isAfter(timestamp.plusSeconds(CACHE_TTL));
        }
    }
}
