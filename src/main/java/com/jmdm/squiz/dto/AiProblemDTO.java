package com.jmdm.squiz.dto;

import lombok.Data;

import java.util.ArrayList;

@Data
public class AiProblemDTO {
    private int problemNo;
    private int kcId;
    private String question;
    private String content;
    private Options options;
    private String answer;
    private Blanks blanks;
    private String explanation;
}
