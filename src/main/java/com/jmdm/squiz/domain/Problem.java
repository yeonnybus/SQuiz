package com.jmdm.squiz.domain;

import com.jmdm.squiz.dto.AnswerDTO;
import com.jmdm.squiz.dto.Choice;
import com.jmdm.squiz.dto.ProblemDTO;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    private String kc;
    private String question;

    @Embedded
    private Choice choice;

    private String content;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.REMOVE)
    private List<Answer> answers = new ArrayList<>();

    @Builder
    public Problem(Long id, Quiz quiz, String kc, String question, Choice choice, String content) {
        this.id = id;
        this.quiz = quiz;
        this.kc = kc;
        this.question = question;
        this.choice = choice;
        this.content = content;
    }

}
