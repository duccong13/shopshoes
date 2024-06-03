package com.nvl.novatech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nvl.novatech.model.Review;
import java.util.List;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{
    
    @Query("Select r from Review r where r.user.userId = :userId")
    List<Review> findReviewByUserId(@Param("userId") Long userId);

    @Query("Select r from Review r where r.product.productId = :productId")
    List<Review> findByProductId(@Param("productId") Long productId);
}
