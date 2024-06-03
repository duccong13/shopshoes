package com.nvl.novatech.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PACKAGE)
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long reviewId;
    String content;
    String imageUrl;
    double rating;

    LocalDateTime createAt;
    

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    Product product;
}
