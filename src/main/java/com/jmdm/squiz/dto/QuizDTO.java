package com.jmdm.squiz.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jmdm.squiz.enums.SubjectType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@Schema(description = "지난 퀴즈 목록에 필요한 정보들")
public class QuizDTO {
    @Schema(description = "각 퀴즈의 id", defaultValue = "1")
    private Long quizId;
    @Schema(description = "퀴즈 이름", defaultValue = "운영체제 1강")
    private String quizName;
    @Schema(description = "과목 명", defaultValue = "OPERATING_SYSTEM")
    private SubjectType subjectType;
    @Schema(description = "문제수", defaultValue = "10")
    private int problemNum;
    @Schema(description = "맞은 문제수", defaultValue = "8")
    private int correctNum;
    @Schema(description = "dkt 추적 결과 50점 보다 낮은 dkt", defaultValue = "[{\"가상메모리\"},{\"페이징\"} ]")
    ArrayList<String> weakPart;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    @Schema(description = "업로드 파일 이름", defaultValue = "os_e03_1.pdf")
    private String uploadFileName;

    @Builder
    public QuizDTO(Long quizId, String quizName, SubjectType subjectType, int problemNum, int correctNum, ArrayList<String> weakPart, LocalDateTime createdAt, String uploadFileName) {
        this.quizId = quizId;
        this.quizName = quizName;
        this.subjectType = subjectType;
        this.problemNum = problemNum;
        this.correctNum = correctNum;
        this.weakPart = weakPart;
        this.createdAt = createdAt;
        this.uploadFileName = uploadFileName;
    }
}
