package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "채점된 퀴즈 목록 요청시의 request")
public class QuizDetailRequest {
    @Schema(description = "db에 저장되는 quiz id",
    defaultValue = "1")
    private Long quizId;
}
