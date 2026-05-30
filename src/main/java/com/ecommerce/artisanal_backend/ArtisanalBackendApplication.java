package com.ecommerce.artisanal_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.ecommerce.artisanal_backend.repository")
public class ArtisanalBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(ArtisanalBackendApplication.class, args);
	}
}
