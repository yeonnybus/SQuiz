package com.jmdm.squiz.dto;

import lombok.Data;

import java.util.ArrayList;

@Data
public class ProblemsLoadResponse {
    ArrayList<ProblemAnswerDTO> problemList;
}
