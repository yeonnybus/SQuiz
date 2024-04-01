package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "questionId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member memberId;

    @ManyToOne
    @JoinColumn(name = "problemId", nullable = false)
    private Problem problemId;

    @Column(columnDefinition = "Text")
    private String questionContent;

    @Column(columnDefinition = "Text")
    private String questionAnswer;

    @Column(columnDefinition = "Text")
    private String userAnswer;

    @OneToMany(mappedBy = "questionId")
    private List<LikeList> fruitBasketList = new ArrayList<>();

    private LocalDateTime createdDate;
}
