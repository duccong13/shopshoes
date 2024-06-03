package com.nvl.novatech.dto.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nvl.novatech.model.Address;
import com.nvl.novatech.model.OrderItem;
import com.nvl.novatech.model.User;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class OrderResponse {
    Long orderId;
    User user;

    List<OrderItem> orderItems = new ArrayList<>();

    Address address;

    double totalPrice;
    double totalItems;
    double totalDiscountedPrice;
    double totalRemain;

    String status;

    LocalDateTime orderDate;
    LocalDateTime deliveryDate;
}
