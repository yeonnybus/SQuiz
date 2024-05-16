package com.jmdm.squiz.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jmdm.squiz.enums.SubjectType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FruitBasketDTO {
    private Long fruitBasketId;
    private String fruitBasketName;
    private SubjectType subject;
    private int problemNum;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime updatedAt;

    @Builder
    public FruitBasketDTO(Long fruitBasketId, String fruitBasketName, SubjectType subject, int problemNum, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.fruitBasketId = fruitBasketId;
        this.fruitBasketName = fruitBasketName;
        this.subject = subject;
        this.problemNum = problemNum;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
