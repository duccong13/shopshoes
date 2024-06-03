package com.nvl.novatech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nvl.novatech.model.Cart;
import com.nvl.novatech.model.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long>{
    
    @Query("SELECT ci FROM CartItem ci WHERE ci.userId = :userId AND ci.cart = :cart AND ci.product.productId = :productId AND ci.size = :size")
    CartItem isCartItemExist(@Param("userId") Long userId, @Param("cart") Cart cart, @Param("productId") Long productId, @Param("size") String size);
    

    @Query("Select ci from CartItem ci where ci.userId = :userId")
    List<CartItem> findCartItemByUserId(@Param("userId") Long userId);
}
