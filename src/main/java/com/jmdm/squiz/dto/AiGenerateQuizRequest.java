package com.jmdm.squiz.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AiGenerateQuizRequest {
    private Long quizId;
    private MultipartFile pdf;
    private QuizGenerateRequest quizGenerateRequest;
}
