package com.jmdm.squiz.dto;

import com.jmdm.squiz.enums.QuizType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data
@Schema(description = "채점된 퀴즈 목록 response")
public class QuizDetailResponse {
    @Schema(description = "db에 저장되는 quizId",
            defaultValue = "1")
    private Long quizId;

    @Schema(description = "퀴즈 유형",
            defaultValue = "MULTIPLE_CHOICE")
    private QuizType quizType;

    @Schema(description = "퀴즈 이름",
            defaultValue = "운영체제 1강")
    private String quizName;

    @Schema(description = "총 문제 수",
            defaultValue = "5")
    private int problemNum;

    @Schema(description = "문제 목록")
    private ArrayList<ProblemAnswerDTO> problemList;

    @Builder
    public QuizDetailResponse(Long quizId, QuizType quizType, String quizName, int problemNum, ArrayList<ProblemAnswerDTO> problemList) {
        this.quizId = quizId;
        this.quizType = quizType;
        this.quizName = quizName;
        this.problemNum = problemNum;
        this.problemList = problemList;
    }
}
