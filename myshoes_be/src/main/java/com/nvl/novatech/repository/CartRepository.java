package com.nvl.novatech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nvl.novatech.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long>{
    
    @Query("Select c from Cart c where c.user.userId = :userId")
    Cart findCartbyUserId(@Param("userId") Long userId);
}
