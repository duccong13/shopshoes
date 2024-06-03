package com.nvl.novatech.dto.response;

import com.nvl.novatech.model.Product;
import com.nvl.novatech.model.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewResponse {
    
    String content;
    String imageUrl;
    double rating;
    User user;
    Product product;
}
