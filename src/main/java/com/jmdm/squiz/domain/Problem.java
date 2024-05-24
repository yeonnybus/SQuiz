package com.jmdm.squiz.domain;

import com.jmdm.squiz.dto.Blanks;
import com.jmdm.squiz.dto.CheckedBlanks;
import com.jmdm.squiz.dto.Options;
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

    private int problemNo;
    private int kcId;
    private String question;
    private String content;

    @Embedded
    private Options options;
    private String answer;

    @Embedded
    private Blanks blanks;
    private String explanation;

    private String checkedAnswer;
    @Embedded
    private CheckedBlanks checkedBlanks;
    private int correct;


    @OneToMany(mappedBy = "problem")
    private List<FruitBasketProblem> fruitBasketProblems = new ArrayList<>();

    @Builder
    public Problem(Long id, Quiz quiz, int kcId, String question, Options options, String content, int problemNo, String answer, Blanks blanks, String explanation) {
        this.id = id;
        setQuiz(quiz);
        this.kcId = kcId;
        this.question = question;
        this.options = options;
        this.content = content;
        this.problemNo = problemNo;
        this.answer = answer;
        this.blanks = blanks;
        this.explanation = explanation;
    }
    private void setQuiz(Quiz quiz) {
        this.quiz = quiz;
        quiz.getProblems().add(this);
    }

    public void setCheckedAnswer(String checkedAnswer, CheckedBlanks blanks) {
        this.checkedAnswer = checkedAnswer;
        this.checkedBlanks = blanks;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
    }

}
