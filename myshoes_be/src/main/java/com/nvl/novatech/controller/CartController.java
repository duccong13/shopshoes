package com.nvl.novatech.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nvl.novatech.dto.request.ApiResponse;
import com.nvl.novatech.dto.request.CartItemRequest;
import com.nvl.novatech.model.Cart;
import com.nvl.novatech.model.User;
import com.nvl.novatech.service.CartService;
import com.nvl.novatech.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartController {
    
    CartService cartService;
    UserService userService;
    
    @GetMapping
    ApiResponse<Cart> getCartByUserId(@RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        return ApiResponse.<Cart>builder()
            .result(cartService.getCartbyUserId(user.getUserId()))
            .build();
    }

    @PostMapping
    ApiResponse<String> addCartItem(@RequestHeader("Authorization") String jwt, @RequestBody CartItemRequest request){

        User user = userService.findUserProfileByJwt(jwt);

        return ApiResponse.<String>builder()
            .result(cartService.addCartItem(user, request))
            .build();
    }

    // @PostMapping("/")
    // ApiResponse<Cart> createCart(@RequestHeader("Authorization") String jwt){
    //     User user = userService.findUserProfileByJwt(jwt);
    //     return ApiResponse.<Cart>builder()
    //         .result(cartService.createCart(user))
    //         .build();
    // }
}
