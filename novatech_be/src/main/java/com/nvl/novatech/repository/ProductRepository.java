package com.nvl.novatech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nvl.novatech.model.Product;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.category.categoryName = :categoryName")
    List<Product> findByCategory(@Param("categoryName") String category);

    @Query("SELECT p FROM Product p " +
            "WHERE (:categoryName IS NULL OR p.category.categoryName = :categoryName OR p.category.parentCategory.categoryName = :categoryName OR p.category.parentCategory.parentCategory.categoryName = :categoryName) "
            +
            "AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (p.discountedPrice BETWEEN :minPrice AND :maxPrice)) " +
            "AND (:minDiscount IS NULL OR p.discountPercent >= :minDiscount) " +
            "ORDER BY " +
            "CASE WHEN :sort = 'price_low' THEN p.discountedPrice END ASC, " +
            "CASE WHEN :sort = 'price_high' THEN p.discountedPrice END DESC")
    List<Product> filterProduct(@Param("categoryName") String category,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            @Param("minDiscount") Integer minDiscount,
            @Param("sort") String sort);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %:name%")
    List<Product> findProductByName(@Param("name") String name);

}
