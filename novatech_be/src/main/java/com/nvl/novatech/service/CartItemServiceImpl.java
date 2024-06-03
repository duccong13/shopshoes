package com.nvl.novatech.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nvl.novatech.dto.request.CartItemUpdateRequest;
import com.nvl.novatech.exception.AppException;
import com.nvl.novatech.exception.ErrorCode;
import com.nvl.novatech.model.Cart;
import com.nvl.novatech.model.CartItem;
import com.nvl.novatech.model.User;
import com.nvl.novatech.repository.CartItemRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartItemServiceImpl implements CartItemService{

    CartItemRepository cartItemRepository;

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getQuantity() * cartItem.getProduct().getPrice());
        cartItem.setDiscountedPrice(cartItem.getQuantity() * cartItem.getProduct().getDiscountedPrice());

        return cartItemRepository.save(cartItem);
    }

    @Override
    public void deleteCartItem(User user, Long cartItemId) {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);
        if(user.getUserId().equals(cartItem.get().getUserId())){
            cartItemRepository.deleteById(cartItemId);
        }
        else{
            throw new AppException(ErrorCode.CAN_NOT_DELETE);
        }
    }

    @Override
    public CartItem updateCartItem(User user, Long cartItemId, CartItemUpdateRequest request) {
        Optional<CartItem> cartitem = cartItemRepository.findById(cartItemId);
        if(user.getUserId().equals(cartitem.get().getUserId())){
            cartitem.get().setQuantity(request.getQuantity());
            cartitem.get().setPrice(request.getQuantity() * cartitem.get().getProduct().getPrice());
            cartitem.get().setDiscountedPrice(request.getQuantity() * cartitem.get().getProduct().getDiscountedPrice());

            return cartItemRepository.save(cartitem.get());
        }

        else{
            throw new AppException(ErrorCode.CAN_NOT_UPDATE);
        }
    }

    @Override
    public CartItem isCartItemExist(Long userId, Cart cart, Long productId, String color) {
        CartItem cartItem = cartItemRepository.isCartItemExist(userId, cart, productId, color);
        return cartItem;
    }

    @Override
    public void deleteCartItemByUserId(Long userId) {
        List<CartItem> cartitems = cartItemRepository.findCartItemByUserId(userId);
        cartItemRepository.deleteAll(cartitems);
    }
    
}
