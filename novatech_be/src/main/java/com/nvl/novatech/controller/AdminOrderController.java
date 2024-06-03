package com.nvl.novatech.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nvl.novatech.dto.request.ApiResponse;
import com.nvl.novatech.dto.request.StatusRequest;
import com.nvl.novatech.model.Order;
import com.nvl.novatech.service.OrderService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/admin/order")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminOrderController {
    OrderService orderService;

    @GetMapping
    ApiResponse<List<Order>> getAllOrder(){
        return ApiResponse.<List<Order>>builder()
            .result(orderService.getAllOrders())
            .build();
    }

    @PutMapping("/{orderId}/place")
    ApiResponse<Order> placedOrder(@PathVariable Long orderId){
        return ApiResponse.<Order>builder()
            .result(orderService.placedOrder(orderId))
            .build();
    }

    @PutMapping("/{orderId}/confirm")
    ApiResponse<Order> confirmedOrder(@PathVariable Long orderId){
        return ApiResponse.<Order>builder()
            .result(orderService.comfirmedOrder(orderId))
            .build();
    }

    @PutMapping("/{orderId}/ship")
    ApiResponse<Order> shippedOrder(@PathVariable Long orderId){
        return ApiResponse.<Order>builder()
            .result(orderService.shippedOrder(orderId))
            .build();
    }

    @PutMapping("/{orderId}/delivery")
    ApiResponse<Order> deliveredOrder(@PathVariable Long orderId){
        return ApiResponse.<Order>builder()
            .result(orderService.deliveredOrder(orderId))
            .build();
    }

    @PutMapping("/{orderId}/cancel")
    ApiResponse<Order> cancelOrder(@PathVariable Long orderId){
        return ApiResponse.<Order>builder()
            .result(orderService.cancelOrder(orderId))
            .build();
    }

    @DeleteMapping("/{orderId}")
    ApiResponse<String> deleteOrder(@PathVariable Long orderId){
        orderService.deleteOrder(orderId);
        return ApiResponse.<String>builder()
        .result("Delete Order Successfully")
        .build();
    }

    @PostMapping("/filter")
    ApiResponse<List<Order>> filterStatus(@RequestBody StatusRequest request){
        return ApiResponse.<List<Order>>builder()
            .result(orderService.filterStatus(request))
            .build();
    }
}
