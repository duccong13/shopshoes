package com.nvl.novatech.service;

import java.util.List;

import com.nvl.novatech.model.OrderItem;

public interface OrderItemService {
    
    public OrderItem createOrderItem(OrderItem orderItem);

    public List<OrderItem> getOrderItem(Long orderId);
}
