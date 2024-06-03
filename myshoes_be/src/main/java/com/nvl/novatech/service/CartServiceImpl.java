package com.nvl.novatech.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nvl.novatech.dto.request.CartItemRequest;
import com.nvl.novatech.exception.AppException;
import com.nvl.novatech.exception.ErrorCode;
import com.nvl.novatech.model.Cart;
import com.nvl.novatech.model.CartItem;
import com.nvl.novatech.model.Product;
import com.nvl.novatech.model.User;
import com.nvl.novatech.repository.CartRepository;
import com.nvl.novatech.repository.ProductRepository;
import com.nvl.novatech.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartServiceImpl implements CartService{

    CartRepository cartRepository;
    ProductRepository productRepository;
    CartItemService cartItemService;
    UserRepository userRepository;

    @Override
    public Cart getCartbyUserId(Long userId) {
        Cart cart = cartRepository.findCartbyUserId(userId);
        if(cart != null){
            double totalPrice = 0;
            double totalItem = 0;
            double totalDiscountedPrice = 0;
            
            for (CartItem cartItem : cart.getCartItems()) {
                totalItem = totalItem + cartItem.getQuantity();
                totalPrice = totalPrice + cartItem.getPrice();
                totalDiscountedPrice = totalDiscountedPrice + cartItem.getDiscountedPrice();
            }
    
            cart.setTotalItem(totalItem);
            cart.setTotalPrice(totalPrice);
            cart.setTotalDiscountedPrice(totalDiscountedPrice);
            cart.setTotalRemaining(totalPrice-totalDiscountedPrice);
    
            return cartRepository.save(cart);
        }
        else {
            Cart newCart = new Cart();
            Optional<User> user = userRepository.findById(userId);
            newCart.setUser(user.get());
            newCart.setTotalItem(0);
            newCart.setTotalPrice(0);
            newCart.setTotalDiscountedPrice(0);
            newCart.setTotalRemaining(0);
    
            return cartRepository.save(newCart);
        }
    }

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(User user, CartItemRequest request) {
        Cart cart = cartRepository.findCartbyUserId(user.getUserId());
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        CartItem isPresent = cartItemService.isCartItemExist(user.getUserId(), cart, product.getProductId(), request.getSize());

        if(isPresent == null){
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            cartItem.setUserId(user.getUserId());
            cartItem.setPrice(product.getPrice());
            cartItem.setSize(request.getSize());

            CartItem createCartitem = cartItemService.createCartItem(cartItem);
            cart.getCartItems().add(createCartitem);
            return "Add Item to Cart";
        }
        throw new AppException(ErrorCode.CART_ITEM_EXISTED);
    }
    
}
