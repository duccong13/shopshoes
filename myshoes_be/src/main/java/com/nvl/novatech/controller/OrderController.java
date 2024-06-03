package com.nvl.novatech.controller;

import java.util.List;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nvl.novatech.dto.request.AddressOrderRequest;
import com.nvl.novatech.dto.request.ApiResponse;
import com.nvl.novatech.dto.request.StatusRequest;
import com.nvl.novatech.model.Order;
import com.nvl.novatech.model.User;
import com.nvl.novatech.service.OrderService;
import com.nvl.novatech.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    
    OrderService orderService;
    UserService userService;
    MailSender mailSender;

    @PostMapping
    ApiResponse<Order> createOrder(@RequestHeader("Authorization") String jwt, @RequestBody AddressOrderRequest request){
        User user = userService.findUserProfileByJwt(jwt);
        
        sendEmail("novatech.technology1@gmail.com", "Order", "Thank you for your order");
        
        return ApiResponse.<Order>builder()
        .result(orderService.createOrder(user, request))
        .build();
    }

    @DeleteMapping("/{orderId}")
    ApiResponse<String> deleteOrderById(@RequestHeader("Authorization") String jwt, @PathVariable Long orderId){
        User user = userService.findUserProfileByJwt(jwt);
        orderService.deleteOrderByUserId(orderId);
        
        sendEmail("novatech.technology1@gmail.com", "Delete Order", "Delete Order Successfully");
        
        return ApiResponse.<String>builder()
        .result("Delete Order Successfully")
        .build();
    }

    @GetMapping
    ApiResponse<List<Order>> getOrderUserHistory(@RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        return ApiResponse.<List<Order>>builder()
        .result(orderService.usersOrderHistory(user))
        .build();
    }

    public void sendEmail(String to, String subject, String content) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("nvanlinh1406@gmail.com"); // Email người gửi cố định
            mailMessage.setTo(to);
            mailMessage.setSubject(subject);
            mailMessage.setText(content);
            mailSender.send(mailMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    

    // @GetMapping("/{orderId}")
    // ApiResponse<Order> getOrderbyId(@RequestHeader("Authorization") String jwt, @PathVariable Long orderId){
    //     User user = userService.findUserProfileByJwt(jwt);
    //     return ApiResponse.<Order>builder()
    //     .result(orderService.findOrderById(orderId))
    //     .build();
    // }
}
