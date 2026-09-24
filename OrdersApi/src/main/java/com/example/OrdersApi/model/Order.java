package com.example.OrdersApi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "titulo_libro", nullable = false, length = 255)
    private String tituloLibro;

    @Column(name = "nombre_usuario", nullable = false, length = 255)
    private String nombreUsuario;

    @Column(name = "precio", nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Column(name = "fecha_hora_compra", nullable = false)
    private LocalDateTime fechaHoraCompra;

    public Order() {
    }

    public Order(
            String tituloLibro,
            String nombreUsuario,
            BigDecimal precio,
            LocalDateTime fechaHoraCompra) {

        this.tituloLibro = tituloLibro;
        this.nombreUsuario = nombreUsuario;
        this.precio = precio;
        this.fechaHoraCompra = fechaHoraCompra;
    }

    public Integer getId() {
        return id;
    }

    public String getTituloLibro() {
        return tituloLibro;
    }

    public void setTituloLibro(String tituloLibro) {
        this.tituloLibro = tituloLibro;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public LocalDateTime getFechaHoraCompra() {
        return fechaHoraCompra;
    }

    public void setFechaHoraCompra(LocalDateTime fechaHoraCompra) {
        this.fechaHoraCompra = fechaHoraCompra;
    }
}