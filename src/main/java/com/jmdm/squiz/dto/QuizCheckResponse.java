package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Data
@Schema(description = "퀴즈 채점 결과")
public class QuizCheckResponse {
    @Schema(description = "db에 저장되는 quizId",
            defaultValue = "1")
    private Long quizId;

    @Schema(description = "퀴즈 이름",
    defaultValue = "운영체제 1강")
    private String quizName;

    @Schema(description = "문제 개수",
    allowableValues = {"5", "10", "15", "20"},
    defaultValue = "15")
    private int problemNum;

    @Schema(description = "맞은 개수",
    defaultValue = "10")
    private int correctNum;

    @Schema(description = "kc 마다의 총 개수와 맞은 개수")
    private List<CorrectPerKcDTO> correctPerKcDTOS;
}

