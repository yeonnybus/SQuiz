package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;

@Data
public class AiProblemDTO {
    private int problemNumber;
    private String kc;
    private String question;
    private Choice choice;
    private String content;
    private ArrayList<AnswerDTO> answers;
}
