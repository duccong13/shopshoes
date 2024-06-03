package com.nvl.novatech.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nvl.novatech.dto.request.ApiResponse;
import com.nvl.novatech.dto.request.UserUpdateRequest;
import com.nvl.novatech.dto.response.UserResponse;
import com.nvl.novatech.model.User;
import com.nvl.novatech.service.UserService;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    
    UserService userService;

    @GetMapping
    ApiResponse<List<User>> getAllUser(){
        return ApiResponse.<List<User>>builder()
            .result(userService.getUsers())
            .build();
    }

    @GetMapping("/profile")
    ApiResponse<User> getUserByJwt(@RequestHeader("Authorization") String jwt){
        return ApiResponse.<User>builder()
            .result(userService.findUserProfileByJwt(jwt))
            .build();
    }

    @PutMapping("/profile/update")
    ApiResponse<UserResponse> updateUser(@RequestBody @Valid UserUpdateRequest request, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        
        return ApiResponse.<UserResponse>builder()
            .result(userService.updateUser(user.getUserId(), request))
            .build();
    }

    @PutMapping("/profile/update/status")
    ApiResponse<User> updateStatus(@RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        
        return ApiResponse.<User>builder()
            .result(userService.setStatus(user.getUserId()))
            .build();
    }

    @DeleteMapping("/{userId}")
    ApiResponse<String> deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
        return ApiResponse.<String>builder()
            .result("Delete user successfully")
            .build();
    }


}
