package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Pdf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pdfId")
    private Long id;

    @Column
    private String fileName;

    @Column
    private String filePath;

    @OneToMany(mappedBy = "pdfId")
    private List<ProblemCreationList> problemList = new ArrayList<>();

    private LocalDateTime createDate;
}
