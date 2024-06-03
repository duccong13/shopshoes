package com.nvl.novatech.model;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@Entity(name = "orders")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    // @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    Set<OrderItem> orderItems = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "address_id")
    Address address;

    double totalPrice;
    double totalItems;
    double totalDiscountedPrice;
    double totalRemain;

    String status;

    boolean isPayment = false;

    LocalDateTime orderDate;
    LocalDateTime deliveryDate;

}
