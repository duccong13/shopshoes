package com.nvl.novatech.service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.nvl.novatech.dto.request.AddressOrderRequest;
import com.nvl.novatech.dto.request.StatusRequest;
import com.nvl.novatech.exception.AppException;
import com.nvl.novatech.exception.ErrorCode;
import com.nvl.novatech.model.Address;
import com.nvl.novatech.model.Cart;
import com.nvl.novatech.model.CartItem;
import com.nvl.novatech.model.Order;
import com.nvl.novatech.model.OrderItem;
import com.nvl.novatech.model.Product;
import com.nvl.novatech.model.User;
import com.nvl.novatech.repository.AddressRepository;
import com.nvl.novatech.repository.CartRepository;
import com.nvl.novatech.repository.OrderItemRepository;
import com.nvl.novatech.repository.OrderRepository;
import com.nvl.novatech.repository.ProductRepository;

// import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderServiceImpl implements OrderService{

    OrderItemRepository orderItemRepository;
    OrderRepository orderRepository;
    CartService cartService;
    ProductRepository productRepository;
    AddressRepository addressRepository;
    CartRepository cartRepository;

    @Override
    // @Transactional
    public Order createOrder(User user, AddressOrderRequest request) {
        Address shippAddress = addressRepository.findById(request.getAddressId()).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_EXISTED));
        Cart cart = cartService.getCartbyUserId(user.getUserId());
        Set<OrderItem> orderItems = new HashSet<>();
        for(CartItem item : cart.getCartItems()){
            OrderItem orderItem = new OrderItem();
            orderItem.setPrice(item.getPrice());
            orderItem.setProduct(item.getProduct());
            orderItem.setDeliveryDate(LocalDateTime.now().plusDays(3));
            orderItem.setColor(item.getSize());
            orderItem.setDiscountedPrice(item.getDiscountedPrice());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setUserId(item.getUserId());
            orderItems.add(orderItemRepository.save(orderItem));
        }

        Order createdOrder = new Order();
        createdOrder.setUser(user);
        createdOrder.setOrderItems(orderItems);
        createdOrder.setTotalPrice(cart.getTotalPrice());
        createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
        createdOrder.setTotalRemain(cart.getTotalRemaining());
        createdOrder.setTotalItems(cart.getTotalItem());
        createdOrder.setAddress(shippAddress);
        createdOrder.setOrderDate(LocalDateTime.now());
        createdOrder.setStatus("PENDING");
        createdOrder.setDeliveryDate(LocalDateTime.now().plusDays(3));
    
        Order savedOrder = orderRepository.save(createdOrder);
        for(OrderItem item : orderItems){
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }

        cart.getCartItems().clear();
        cartRepository.save(cart);
        cartService.getCartbyUserId(user.getUserId());

        for(OrderItem item : orderItems){
            Optional<Product> product = productRepository.findById(item.getProduct().getProductId());
            product.get().setQuantity(product.get().getQuantity() - item.getQuantity());
            productRepository.save(product.get());
        }

        return savedOrder;
    }



    @Override
    public Order findOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        return order;
    }

    @Override
    public List<Order> usersOrderHistory(User user) {
        List<Order> orders = orderRepository.findByUserId(user.getUserId());
        return orders;
    }

    @Override
    public Order placedOrder(Long orderId) {
        Order order = findOrderById(orderId);
        order.setStatus("PLACED");
        return orderRepository.save(order);
    }

    @Override
    public Order comfirmedOrder(Long orderId) {
        Order order = findOrderById(orderId);
        order.setStatus("CONFIRMED");
        return orderRepository.save(order);
    }

    @Override
    public Order shippedOrder(Long orderId) {
        Order order = findOrderById(orderId);
        order.setStatus("SHIPPED");
        return orderRepository.save(order);
    }

    @Override
    public Order deliveredOrder(Long orderId) {
        Order order = findOrderById(orderId);
        order.setStatus("DELIVERED");
        order.setPayment(true);
        return orderRepository.save(order);
    }

    @Override
    public Order cancelOrder(Long orderId) {
        Order order = findOrderById(orderId);
        order.setStatus("PLACED");
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }



    @Override
    public List<Order> filterStatus(StatusRequest request) {
        return orderRepository.filterStatus(request.getStatus());
    }



    @Override
    public void deleteOrderByUserId(Long orderId) {
        orderRepository.deleteById(orderId);
    }



    @Override
    public void deleteOldOrder() {
        LocalDateTime times = LocalDateTime.now().minusMonths(1);
        List<Order> orders = orderRepository.findOldOrders(times);
        orderRepository.deleteAll(orders);
    }
    
}
