package com.younhasi.younhafancommunity.controller.api.instagram;

import com.younhasi.younhafancommunity.dto.api.instagram.InstagramRequest;
import com.younhasi.younhafancommunity.dto.api.instagram.InstagramResponse;
import com.younhasi.younhafancommunity.service.api.instagram.InstagramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instagram")
@RequiredArgsConstructor
public class InstagramController {

    private final InstagramService instagramService;

    @PostMapping("/update")
    public ResponseEntity<String> updatePosts(@RequestBody List<InstagramRequest> posts) {

        System.out.println("받은 전체 post 수: {}" + posts.size());


        instagramService.savePosts(posts);
        return ResponseEntity.ok("Instagram posts saved.");
    }

    @GetMapping("/latest")
    public ResponseEntity<List<InstagramResponse>> getLatestPosts(@RequestParam(defaultValue = "6") int count) {
        return ResponseEntity.ok(instagramService.getLatestPosts(count));
    }
}
