package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Summary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "summaryId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User userId;

    @ManyToOne
    @JoinColumn(name = "pdfId", nullable = false)
    private Pdf pdfId;

    @Column(columnDefinition = "Text")
    private String content;

    private LocalDateTime createDate;
}
