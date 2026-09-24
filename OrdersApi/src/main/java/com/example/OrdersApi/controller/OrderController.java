package com.example.OrdersApi.controller;

import com.example.OrdersApi.config.DatabaseInitializer;
import com.example.OrdersApi.model.Order;
import com.example.OrdersApi.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class OrderController {

    private static final Logger logger =
            LoggerFactory.getLogger(OrderController.class);

    private final OrderService service;
    private final DataSource dataSource;
    private final DatabaseInitializer databaseInitializer;

    public OrderController(
            OrderService service,
            DataSource dataSource,
            DatabaseInitializer databaseInitializer) {

        this.service = service;
        this.dataSource = dataSource;
        this.databaseInitializer = databaseInitializer;
    }

    @GetMapping("/health/live")
    public ResponseEntity<Map<String, String>> live() {

        logger.info("GET /health/live - Respuesta 200");

        return ResponseEntity.ok(
                Map.of("status", "Healthy")
        );
    }

    @GetMapping("/health/ready")
    public ResponseEntity<Map<String, String>> ready() {

        logger.info("GET /health/ready - Inicio");

        try {

            boolean initialized =
                    databaseInitializer.initialize();

            if (!initialized) {

                logger.warn(
                        "GET /health/ready - PostgreSQL no disponible"
                );

                return ResponseEntity
                        .status(HttpStatus.SERVICE_UNAVAILABLE)
                        .body(Map.of("status", "Unhealthy"));
            }

            try (Connection connection =
                         dataSource.getConnection()) {

                if (connection.isValid(2)) {

                    logger.info(
                            "GET /health/ready - Respuesta 200"
                    );

                    return ResponseEntity.ok(
                            Map.of("status", "Healthy")
                    );
                }
            }

        } catch (Exception ex) {

            logger.error(
                    "GET /health/ready - PostgreSQL no disponible",
                    ex
            );
        }

        logger.warn(
                "GET /health/ready - Respuesta 503"
        );

        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of("status", "Unhealthy"));
    }

    @GetMapping("/api/orders")
    public ResponseEntity<?> getAll() {

        try {

            logger.info(
                    "GET /api/orders - Inicio"
            );

            if (!databaseInitializer.initialize()) {

                logger.warn(
                        "GET /api/orders - PostgreSQL no disponible"
                );

                return ResponseEntity
                        .status(HttpStatus.SERVICE_UNAVAILABLE)
                        .body(Map.of(
                                "message",
                                "PostgreSQL no está disponible."
                        ));
            }

            List<Order> orders =
                    service.getAll();

            logger.info(
                    "GET /api/orders - Respuesta 200. Ordenes: {}",
                    orders.size()
            );

            return ResponseEntity.ok(orders);

        } catch (Exception ex) {

            logger.error(
                    "GET /api/orders - Error inesperado",
                    ex
            );

            return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of(
                            "message",
                            "PostgreSQL no está disponible."
                    ));
        }
    }

    @GetMapping("/api/orders/{id}")
    public ResponseEntity<?> getById(
            @PathVariable Integer id) {

        try {

            logger.info(
                    "GET /api/orders/{} - Inicio",
                    id
            );

            if (!databaseInitializer.initialize()) {

                logger.warn(
                        "GET /api/orders/{} - PostgreSQL no disponible",
                        id
                );

                return ResponseEntity
                        .status(HttpStatus.SERVICE_UNAVAILABLE)
                        .body(Map.of(
                                "message",
                                "PostgreSQL no está disponible."
                        ));
            }

            Optional<Order> order =
                    service.getById(id);

            if (order.isEmpty()) {

                logger.warn(
                        "GET /api/orders/{} - Orden no encontrada",
                        id
                );

                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "message",
                                "Orden no encontrada."
                        ));
            }

            logger.info(
                    "GET /api/orders/{} - Respuesta 200",
                    id
            );

            return ResponseEntity.ok(
                    order.get()
            );

        } catch (Exception ex) {

            logger.error(
                    "GET /api/orders/{} - Error inesperado",
                    id,
                    ex
            );

            return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of(
                            "message",
                            "PostgreSQL no está disponible."
                    ));
        }
    }

    @PostMapping("/api/orders")
    public ResponseEntity<?> create(
            @RequestBody Order order) {

        try {

            logger.info(
                    "POST /api/orders - Inicio"
            );

            if (!databaseInitializer.initialize()) {

                logger.warn(
                        "POST /api/orders - PostgreSQL no disponible"
                );

                return ResponseEntity
                        .status(HttpStatus.SERVICE_UNAVAILABLE)
                        .body(Map.of(
                                "message",
                                "PostgreSQL no está disponible."
                        ));
            }

            Order createdOrder =
                    service.create(order);

            logger.info(
                    "POST /api/orders - Orden creada. Id: {}",
                    createdOrder.getId()
            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(createdOrder);

        } catch (Exception ex) {

            logger.error(
                    "POST /api/orders - Error inesperado",
                    ex
            );

            return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of(
                            "message",
                            "PostgreSQL no está disponible."
                    ));
        }
    }
}