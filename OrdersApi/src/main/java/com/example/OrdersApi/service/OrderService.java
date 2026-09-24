package com.example.OrdersApi.service;

import com.example.OrdersApi.model.Order;
import com.example.OrdersApi.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public List<Order> getAll() {
        return repository.findAll();
    }

    public Optional<Order> getById(Integer id) {
        return repository.findById(id);
    }

    public Order create(Order order) {
        return repository.save(order);
    }
}