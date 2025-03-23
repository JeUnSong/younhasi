package com.younhasi.younhafancommunity.domain.user;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String password; // 소셜 로그인 시 null 가능

    //현재 소셜 닉네임을 받고있지만 닉네임을 받지않고 직접 입력하여 가입하도록 수정 필요
    @Column(nullable = false, unique = true)
    private String nickname;

    @Column
    private String profileImage; // URL 저장

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_social_types", joinColumns = @JoinColumn(name = "user_id"))
    private Set<String> socialType = new HashSet<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_social_ids", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "provider")
    @Column(name = "social_id")
    private Map<String, String> socialId = new HashMap<>();

    @Column(nullable = false)
    private String role; // USER, ADMIN

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
