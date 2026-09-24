package com.example.OrdersApi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() {

        String url = System.getenv("POSTGRES_JDBC_URL");
        String username = System.getenv("POSTGRES_USER");
        String password = System.getenv("POSTGRES_PASSWORD");

        DriverManagerDataSource dataSource =
                new DriverManagerDataSource();

        if (url == null || url.isBlank()) {
            return dataSource;
        }

        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);

        return dataSource;
    }
}