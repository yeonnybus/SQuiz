package com.jmdm.squiz.dto;

import com.jmdm.squiz.enums.SubjectType;
import lombok.Data;

import java.util.ArrayList;

@Data
public class AiQuizCheckResponse {
    private String memberId;
    private SubjectType subject;
    private ArrayList<Dkt> dkt;
}
