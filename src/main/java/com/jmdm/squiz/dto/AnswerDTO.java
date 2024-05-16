package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.Data;

@Data
@Schema(description = "각 problem에 대한 답")
public class AnswerDTO {
    @Schema(description = "해당 문제 답 만약 객관식이라면 id 는 0 빈칸 문제면 해당 빈칸 번호",
    defaultValue = "0")
    private int problemNumber;

    @Schema(description = "답",
    defaultValue = "b")
    private String answer;

    @Schema(description = "해설",
    defaultValue = "답에 대한 해설입니다. 해설을 봐도 모르면 공부를 더하란 의미겠지요 화이팅")
    private String explanation;

    @Builder
    public AnswerDTO(int problemNumber, String answer, String explanation) {
        this.problemNumber = problemNumber;
        this.answer = answer;
        this.explanation = explanation;
    }
}
