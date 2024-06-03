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

import com.nvl.novatech.dto.request.ApiResponse;
import com.nvl.novatech.dto.request.ReviewRequest;
import com.nvl.novatech.dto.request.ReviewUpdateRequest;
import com.nvl.novatech.model.Review;
import com.nvl.novatech.model.User;
import com.nvl.novatech.service.ReviewService;
import com.nvl.novatech.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewController {
    
    
    ReviewService reviewService;
    UserService userService;

    @PostMapping
    ApiResponse<Review> createReview(@RequestBody ReviewRequest request, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        return ApiResponse.<Review>builder()
            .result(reviewService.createReview(request, user))
            .build();
    }

    @PutMapping("/{reviewId}")
    ApiResponse<Review> updateReview(@PathVariable Long reviewId, @RequestBody ReviewUpdateRequest request, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        return ApiResponse.<Review>builder()
            .result(reviewService.updateReview(reviewId, user, request))
            .build();
    }

    @DeleteMapping("/{reviewId}")
    ApiResponse<String> deleteReview(@PathVariable Long reviewId, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        reviewService.deleteReview(reviewId, user);
        return ApiResponse.<String>builder()
            .result("Delete review successfully")
            .build();
    }

    @GetMapping("/{productId}")
    ApiResponse<List<Review>> getAllReviewByProductId(@PathVariable Long productId, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        return ApiResponse.<List<Review>>builder()
            .result(reviewService.getAllReviewByProductId(productId, user))
            .build();
    }

}
