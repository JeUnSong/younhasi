package com.younhasi.younhafancommunity.dto.comment;

import com.younhasi.younhafancommunity.domain.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private Long id;
    private String content;
    private String author;
    private LocalDateTime createdAt;

    public static CommentResponse from(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .author(comment.getUser().getNickname())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}