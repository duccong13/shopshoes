package com.nvl.novatech.service;

import java.util.List;

import com.nvl.novatech.dto.request.ReviewRequest;
import com.nvl.novatech.dto.request.ReviewUpdateRequest;
import com.nvl.novatech.model.Review;
import com.nvl.novatech.model.User;

public interface ReviewService {
    
    Review createReview(ReviewRequest request, User user);
    Review updateReview(Long reviewId, User user, ReviewUpdateRequest request);
    void deleteReview(Long reviewId, User user);

    List<Review> getAllReviewByProductId(Long productId, User user);
}
