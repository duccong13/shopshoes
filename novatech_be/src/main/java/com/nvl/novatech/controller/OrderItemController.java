package com.nvl.novatech.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nvl.novatech.dto.request.ApiResponse;
import com.nvl.novatech.model.OrderItem;
import com.nvl.novatech.service.OrderItemService;
import com.nvl.novatech.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/order/orderItems")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderItemController {
    OrderItemService orderItemService;
    UserService userService;

    @GetMapping("/{orderId}")
    ApiResponse<List<OrderItem>> getOrderItemByOrderId(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt){
        userService.findUserProfileByJwt(jwt);
        return ApiResponse.<List<OrderItem>>builder()
            .result(orderItemService.getOrderItem(orderId))
            .build();
    }
}
