package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class ProblemCreationList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "problemCreationListId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "problemId", nullable = false)
    private Problem problemId;

    @ManyToOne
    @JoinColumn(name = "pdfId", nullable = false)
    private Pdf pdfId;
}
