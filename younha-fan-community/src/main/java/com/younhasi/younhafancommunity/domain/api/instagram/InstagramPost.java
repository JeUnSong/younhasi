package com.younhasi.younhafancommunity.domain.api.instagram;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstagramPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(unique = true)
    private String postUrl;

    @Column(length = 1000)
    private String imageUrl;

    private LocalDateTime createdAt;
}
