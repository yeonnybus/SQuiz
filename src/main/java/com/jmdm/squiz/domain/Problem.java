package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "problemId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User userId;

    @OneToMany(mappedBy = "problemId")
    private List<ProblemCreationList> pdfList = new ArrayList<>();

    @Column
    private String type;

    @Column
    private int version;

    private LocalDateTime createDate;
}
