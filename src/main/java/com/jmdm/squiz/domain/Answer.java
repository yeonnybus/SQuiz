package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    private int problemNumber;
    private String answer;
    private String explanation;

    @Builder
    public Answer(Long id, Problem problem, int problemNumber, String answer, String explanation) {
        this.id = id;

        this.problemNumber = problemNumber;
        this.answer = answer;
        this.explanation = explanation;
    }

    private void setProblem(Problem problem) {
        this.problem = problem;
        problem.getAnswers().add(this);
    }
}
