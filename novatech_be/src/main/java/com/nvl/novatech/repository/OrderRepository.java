package com.nvl.novatech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nvl.novatech.model.Order;
import java.time.LocalDateTime;



@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{
    
    @Query("Select o from orders o where o.user.userId = :userId")
    List<Order> findByUserId(@Param("userId") Long userId);

    @Query("Select o from orders o where o.status = :status")
    List<Order> filterStatus(@Param("status") String status);

    @Query("SELECT o FROM orders o where o.orderDate < ?1")
    List<Order> findOldOrders(LocalDateTime oneMonthAgo);
}
