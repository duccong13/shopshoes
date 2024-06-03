package com.nvl.novatech.config;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.nvl.novatech.service.OrderService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderScheduler {
    
    OrderService orderService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void deleteOldOrders(){
        orderService.deleteOldOrder();
    }

}
