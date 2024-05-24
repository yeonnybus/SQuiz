package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Data
@Schema(description = "지난 퀴즈 목록 response")
public class QuizListLoadResponse {
    @Schema(description = "퀴즈 목록들")
    private ArrayList<QuizDTO> quizList;
}
