package com.jmdm.squiz.domain;

import com.jmdm.squiz.enums.ProblemNum;
import com.jmdm.squiz.enums.QuizType;
import com.jmdm.squiz.enums.Rank;
import com.jmdm.squiz.enums.SubjectType;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pdf_id")
    private Pdf pdf;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String quizName;
    private SubjectType subject;
    private int startPage;
    private int endPage;
    private QuizType quizType;
    private int problemNum;
    private Rank rank;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Problem> problems = new ArrayList<>();
    //Pdf pdf, Member member,
    @Builder
    public Quiz(Long id, String quizName, Pdf pdf, Member member, SubjectType subject, int startPage, int endPage, QuizType quizType, int problemNum, Rank rank) {
        this.id = id;
        setPdf(pdf);
        setMember(member);
        this.quizName = quizName;
        this.subject = subject;
        this.startPage = startPage;
        this.endPage = endPage;
        this.quizType = quizType;
        this.problemNum = problemNum;
        this.rank = rank;
    }
    private void setPdf(Pdf pdf) {
        this.pdf = pdf;
        pdf.getQuizes().add(this);
    }

    private void setMember(Member member) {
        this.member = member;
        member.getQuizs().add(this);
    }
}
