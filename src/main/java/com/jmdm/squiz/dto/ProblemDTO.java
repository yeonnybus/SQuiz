package com.jmdm.squiz.dto;

import lombok.Data;

import java.util.ArrayList;

@Data
public class ProblemDTO {
    private int id;
    private String kc;
    private String question;
    private Choice choice;
    private String content;
    private ArrayList<AnswerDTO> answerDTOS;
}
