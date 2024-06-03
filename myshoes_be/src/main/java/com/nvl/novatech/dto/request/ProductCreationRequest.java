package com.nvl.novatech.dto.request;

import java.util.HashSet;
import java.util.Set;

import com.nvl.novatech.model.Size;
import com.nvl.novatech.model.Image;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductCreationRequest {
    String name;
    String description;
    double price;
    double discountedPrice;
    double discountPercent;
    int quantity;

    Set<Image> images = new HashSet<>();
    Set<Size> size = new HashSet<>();

    String fristLevelCategory;
    String secondLevelCategory;
    String thirdLevelCategory;
}
