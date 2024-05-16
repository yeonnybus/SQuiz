package com.jmdm.squiz.domain;

import com.jmdm.squiz.dto.Choice;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private int problemNumber;
    private String kc;
    private String question;

    @Embedded
    private Choice choice;

    private String content;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.REMOVE)
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "problem")
    private List<FruitBasketProblem> fruitBasketProblems = new ArrayList<>();

    @Builder
    public Problem(Long id, Quiz quiz, String kc, String question, Choice choice, String content, int problemNumber) {
        this.id = id;
        setQuiz(quiz);
        this.kc = kc;
        this.question = question;
        this.choice = choice;
        this.content = content;
        this.problemNumber = problemNumber;
    }
    private void setQuiz(Quiz quiz) {
        this.quiz = quiz;
        quiz.getProblems().add(this);
    }

}
