package com.jmdm.squiz.dto;

import com.jmdm.squiz.enums.QuizType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "과일바구니 문제 추가 request")
public class ProblemAddRequest {
    @Schema(description = "db에 저장되는 과일바구니 id",
    defaultValue = "1")
    private Long fruitBasketId;
    @Schema(description = "추가할 문제의 id",
    defaultValue = "1")
    private Long problemId;
    @Schema(description = "해당 퀴즈의 유형",
    defaultValue = "MULTIPLE_CHOICE")
    private QuizType quizType;
}
