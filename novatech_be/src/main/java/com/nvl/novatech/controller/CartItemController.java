package com.nvl.novatech.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nvl.novatech.dto.request.ApiResponse;
import com.nvl.novatech.dto.request.CartItemUpdateRequest;
import com.nvl.novatech.model.CartItem;
import com.nvl.novatech.model.User;
import com.nvl.novatech.service.CartItemService;
import com.nvl.novatech.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/cart/cartItem")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartItemController {
    CartItemService cartItemService;
    UserService userService;

    @PutMapping("/{cartItemId}")
    ApiResponse<CartItem> updateCartItem(@PathVariable Long cartItemId, @RequestBody CartItemUpdateRequest request,  @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        return ApiResponse.<CartItem>builder()
            .result(cartItemService.updateCartItem(user, cartItemId, request))
            .build();          
    }


    @DeleteMapping("/{cartItemId}")
    ApiResponse<String> deleteCartItem(@PathVariable Long cartItemId, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        cartItemService.deleteCartItem(user, cartItemId);
        return ApiResponse.<String>builder()
            .result("Delete Cart Item Successfully")
            .build();          
    }
}
