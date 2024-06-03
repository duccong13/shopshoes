package com.nvl.novatech.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nvl.novatech.dto.request.AddressRequest;
import com.nvl.novatech.dto.request.ApiResponse;
import com.nvl.novatech.dto.response.AddressResponse;
import com.nvl.novatech.model.User;
import com.nvl.novatech.service.AddressService;
import com.nvl.novatech.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/address")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AddressController {
    
    AddressService addressService;
    UserService userService;

    @PostMapping("/create")
    ApiResponse<AddressResponse> createAddress(@RequestBody AddressRequest request, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);

        return ApiResponse.<AddressResponse>builder()
            .result(addressService.createAddress(request, user))
            .build();
    }

    @GetMapping
    ApiResponse<List<AddressResponse>> getAllAddress(@RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        return ApiResponse.<List<AddressResponse>>builder()
            .result(addressService.getAddress(user))
            .build();
    }

    @PutMapping("/update/{addressId}")
    ApiResponse<AddressResponse> updateAddress(@PathVariable Long addressId, @RequestBody AddressRequest request, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        return ApiResponse.<AddressResponse>builder()
            .result(addressService.updateAddress(addressId, request, user))
            .build();
    }

    @DeleteMapping("/delete/{addressId}")
    ApiResponse<String> deleteAddress(@PathVariable Long addressId, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        addressService.deleteAddress(addressId, user);
        return ApiResponse.<String>builder()
            .result("Delete Address Successfully")
            .build();
    }

}
