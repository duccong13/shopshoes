package com.nvl.novatech.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nvl.novatech.dto.request.ReviewRequest;
import com.nvl.novatech.dto.request.ReviewUpdateRequest;
import com.nvl.novatech.exception.AppException;
import com.nvl.novatech.exception.ErrorCode;
import com.nvl.novatech.model.Product;
import com.nvl.novatech.model.Review;
import com.nvl.novatech.model.User;
import com.nvl.novatech.repository.ProductRepository;
import com.nvl.novatech.repository.ReviewRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewServiceImpl implements ReviewService{
    
    ReviewRepository reviewRepository;
    ProductRepository productRepository;

    @Override
    public Review createReview(ReviewRequest request, User user) {
        Product product = productRepository.findById(request.getProductId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));
        Review review = new Review();
        review.setContent(request.getContent());
        review.setImageUrl(request.getImageUrl());
        review.setRating(request.getRating());
        review.setProduct(product);
        review.setUser(user);
        review.setCreateAt(LocalDateTime.now());
        return reviewRepository.save(review);
    }

    @Override
    public Review updateReview(Long reviewId, User user, ReviewUpdateRequest request) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_EXISTED));
        review.setContent(request.getContent());
        review.setImageUrl(request.getImageUrl());
        review.setRating(request.getRating());
        review.setCreateAt(LocalDateTime.now());
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long reviewId, User user) {
        List<Review> listReview = reviewRepository.findReviewByUserId(user.getUserId());
        Review rv = reviewRepository.findById(reviewId).orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_EXISTED));
        for (Review review : listReview) {
            if(review.getReviewId().equals(rv.getReviewId())){
                reviewRepository.delete(review);
            }
        }
    }

    @Override
    public List<Review> getAllReviewByProductId(Long productId, User user) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return reviews;
    }


}
