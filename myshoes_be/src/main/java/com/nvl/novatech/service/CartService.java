package com.nvl.novatech.service;

import com.nvl.novatech.dto.request.CartItemRequest;
import com.nvl.novatech.model.Cart;
import com.nvl.novatech.model.User;

public interface CartService {
    
    Cart getCartbyUserId(Long userId);

    Cart createCart(User user);

    String addCartItem(User user, CartItemRequest request);
}
