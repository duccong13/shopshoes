package com.nvl.novatech.service;

import java.util.List;

import com.nvl.novatech.dto.request.AddressOrderRequest;
import com.nvl.novatech.dto.request.StatusRequest;
import com.nvl.novatech.dto.response.OrderResponse;
import com.nvl.novatech.model.Order;
import com.nvl.novatech.model.User;

public interface OrderService {
    Order createOrder(User user, AddressOrderRequest request);//user
    Order findOrderById(Long orderId);//admin
    List<Order> usersOrderHistory(User user);//user
    Order placedOrder(Long orderId);
    Order comfirmedOrder(Long orderId);
    Order shippedOrder(Long orderId);
    Order deliveredOrder(Long orderId);
    Order cancelOrder(Long orderId);
    List<Order> getAllOrders();
    void deleteOrder(Long orderId);
    void deleteOrderByUserId(Long orderId);
    List<Order> filterStatus(StatusRequest request);
    void deleteOldOrder();
}
