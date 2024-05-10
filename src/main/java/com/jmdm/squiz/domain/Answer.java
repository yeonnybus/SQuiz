package com.jmdm.squiz.domain;

import com.jmdm.squiz.dto.AnswerDTO;
import com.jmdm.squiz.dto.ProblemDTO;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private Problem problem;

    private int idx;
    private String answer;

    @Builder
    public Answer(Long id, Problem problem, int idx, String answer) {
        this.id = id;
        this.problem = problem;
        this.idx = idx;
        this.answer = answer;
    }
}
