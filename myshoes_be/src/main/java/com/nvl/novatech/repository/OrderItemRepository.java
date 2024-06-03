package com.nvl.novatech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nvl.novatech.model.OrderItem;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{
    
    @Query("Select oi From OrderItem oi where oi.order.orderId = :orderId")
    List<OrderItem> findOrderItemByOrderId(@Param("orderId") Long orderId);
}
