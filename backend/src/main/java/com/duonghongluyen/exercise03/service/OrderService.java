package com.duonghongluyen.exercise03.service;

import java.util.List;
import java.util.UUID;

import com.duonghongluyen.exercise03.entity.Order;

public interface OrderService {
    Order addOrder(Order order);

    Order getOrderById(UUID orderId);

    List<Order> getAllOrders();

    Order updateOrder(UUID orderId, Order updatedOrder);

    void deleteOrder(UUID orderId);
}
