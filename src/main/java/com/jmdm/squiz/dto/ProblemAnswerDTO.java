package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Schema(description = "문제 객체")
public class ProblemAnswerDTO {
    @Schema(description = "문제 번호",
            defaultValue = "1")
    private int problemNo;
    @Schema(description = "문제",
            defaultValue = "올바른 선택지를 고르시오.")
    private String question;
    @Schema(description = "선택지 만약 객관식이 아니라면 각 값은 null")
    private Options options;
    @Schema(description = "빈칸이 포함된 내용 만약 빈칸이 아니라면 null",
            defaultValue = "null")
    private String content;
    @Schema(description = "객관식/ox 유형일 때의 답", defaultValue = "a")
    private String answer;
    @Schema(description = "객관식/ox 유형일 때의 사용자가 선택한 답", defaultValue = "b")
    private String checkedAnswer;
    @Schema(description = "빈칸 유형일 때의 빈칸 답")
    private Blanks blanks;
    @Schema(description = "빈칸 유형일 때의 사용자가 입력한 빈칸")
    private CheckedBlanks checkedBlanks;
    @Schema(description = "문제가 맞으면 1, 틀리면 0")
    private int isCorrect;

    @Builder
    public ProblemAnswerDTO(int problemNo, String question, Options options, String content, String answer, String checkedAnswer, Blanks blanks, CheckedBlanks checkedBlanks, int isCorrect) {
        this.problemNo = problemNo;
        this.question = question;
        this.options = options;
        this.content = content;
        this.answer = answer;
        this.checkedAnswer = checkedAnswer;
        this.blanks = blanks;
        this.checkedBlanks = checkedBlanks;
        this.isCorrect = isCorrect;
    }
}
