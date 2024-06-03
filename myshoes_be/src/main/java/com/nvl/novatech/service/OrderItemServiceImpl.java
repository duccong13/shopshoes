package com.nvl.novatech.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nvl.novatech.model.OrderItem;
import com.nvl.novatech.repository.OrderItemRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderItemServiceImpl implements OrderItemService{
    
    OrderItemRepository orderItemRepository;

    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public List<OrderItem> getOrderItem(Long orderId) {
        return orderItemRepository.findOrderItemByOrderId(orderId);
    }

    
    
}
