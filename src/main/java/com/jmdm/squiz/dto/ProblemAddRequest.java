package com.jmdm.squiz.dto;

import com.jmdm.squiz.enums.QuizType;
import lombok.Data;

@Data
public class ProblemAddRequest {
    private Long fruitBasketId;
    private Long problemId;
    private QuizType quizType;
}
