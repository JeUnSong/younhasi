package com.younhasi.younhafancommunity.dto.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostCreateRequest {
    private String title;
    private String content;
    private String boardType; // 게시판 타입 (자유, 자료 등)

    // 유효성 검사 (예: @NotBlank) 추가 가능
}
