package com.textmate.textmatebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class TextmateBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TextmateBackendApplication.class, args);
    }

}
