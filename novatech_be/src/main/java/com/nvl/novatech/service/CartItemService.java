package com.nvl.novatech.service;

import com.nvl.novatech.dto.request.CartItemUpdateRequest;
import com.nvl.novatech.model.Cart;
import com.nvl.novatech.model.CartItem;
import com.nvl.novatech.model.User;

public interface CartItemService {
    
    CartItem createCartItem(CartItem cartItem);
    void deleteCartItem(User user, Long cartItemId);
    CartItem updateCartItem(User user, Long cartItemId, CartItemUpdateRequest request);
    CartItem isCartItemExist(Long userId, Cart cart, Long productId, String color);
    void deleteCartItemByUserId(Long userId);
}
