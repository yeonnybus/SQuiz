package com.jmdm.squiz.dto;

import lombok.Data;

@Data
public class CheckProblemDTO {
    private int problemNo;
    private String checkedAnswer;
    private CheckedBlanks checkedBlanks;
}
