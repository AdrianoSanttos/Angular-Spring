package com.adriano.crudspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.adriano")
@EnableJpaRepositories(basePackages = "com.adriano.repository")
@EntityScan(basePackages = "com.adriano.model")
public class CrudSpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(CrudSpringApplication.class, args);
    }
}
