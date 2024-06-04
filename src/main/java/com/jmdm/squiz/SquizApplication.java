package com.jmdm.squiz;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // JPA 리포지토리 패키지 지정
public class SquizApplication {
	public static void main(String[] args) {
		SpringApplication.run(SquizApplication.class, args);
	}
}
