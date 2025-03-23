package com.younhasi.younhafancommunity.domain.report;

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
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"user_id", "target_id", "target_type"} // 같은 대상에 중복 신고 방지
        )
)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 신고자

    @Column(nullable = false)
    private Long targetId; // 게시글 ID 또는 댓글 ID (다형성)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportType targetType; // POST or COMMENT

    @Column(columnDefinition = "TEXT", nullable = false)
    private String reason; // 신고 사유

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
