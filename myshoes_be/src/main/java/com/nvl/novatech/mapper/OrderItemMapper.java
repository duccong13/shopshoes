package com.nvl.novatech.mapper;

import org.mapstruct.Mapper;

import com.nvl.novatech.model.CartItem;
import com.nvl.novatech.model.OrderItem;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
    
    OrderItem toOrderItem(CartItem cartItem);
}
