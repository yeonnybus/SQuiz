package com.jmdm.squiz.dto;

import com.jmdm.squiz.enums.ProblemNum;
import com.jmdm.squiz.enums.QuizType;
import com.jmdm.squiz.enums.Rank;
import com.jmdm.squiz.enums.SubjectType;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class QuizGenerateRequest {
    @NotBlank()
    private Long pdfId;
    @NotBlank(message = "퀴즈 이름은 필수입니다.")
    private String quizName;
    @NotBlank(message = "과목 선택은 필수입니다.")
    private SubjectType subject;
    @NotBlank(message = "시작 페이지는 필수입니다.")
    private int startPage;
    @NotBlank(message = "끝 페이지는 필수입니다.")
    private int endPage;
    @NotBlank(message = "문제 유형은  필수입니다.")
    private QuizType quizType;
    @NotBlank(message = "문제 개수는 필수입니다.")
    private ProblemNum problemNum;
    @NotBlank(message = "난이도는 필수입니다.")
    private Rank rank;
}
