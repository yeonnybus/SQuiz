package com.jmdm.squiz.dto;

import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.Data;

@Data
public class AnswerDTO {
    private int id;
    private String answer;

    @Builder
    public AnswerDTO(int id, String answer) {
        this.id = id;
        this.answer = answer;
    }

    public AnswerDTO() {

    }
}
