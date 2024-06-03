package com.nvl.novatech.dto.response;

import java.util.Set;

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
public class ProductResponse {

    String name;
    String description;
    String brand;
    double price;
    double discountedPrice;
    double discountPercent;
    int quantity;
    
    Set<ImageResponse> images;
    Set<ColorResponse> colors;

}
