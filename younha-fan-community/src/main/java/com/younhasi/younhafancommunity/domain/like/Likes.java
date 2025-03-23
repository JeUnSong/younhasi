package com.younhasi.younhafancommunity.domain.like;

import com.younhasi.younhafancommunity.domain.post.Post;
import com.younhasi.younhafancommunity.domain.comment.Comment;
import com.younhasi.younhafancommunity.domain.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        name = "likes",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"user_id", "post_id", "comment_id"} // ✅ 유저가 같은 대상(게시글/댓글)에 여러 번 좋아요 못 누르게 설정
        )
)
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post; // ✅ 게시글 좋아요

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment; // ✅ 댓글 좋아요

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
