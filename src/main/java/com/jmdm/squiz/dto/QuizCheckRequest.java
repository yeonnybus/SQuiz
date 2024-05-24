package com.jmdm.squiz.dto;

import com.jmdm.squiz.enums.QuizType;
import lombok.Data;

import java.util.ArrayList;


@Data
public class QuizCheckRequest {
    private Long quizId;
    private ArrayList<CheckProblemDTO> problems;
}
