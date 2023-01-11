package com.main_001.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@PropertySource("classpath:/env.yml")
@EnableJpaAuditing
@SpringBootApplication
public class HeartApplication {

	public static void main(String[] args) {
		SpringApplication.run(HeartApplication.class, args);
	}

}
