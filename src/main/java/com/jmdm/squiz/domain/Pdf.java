package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Pdf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column
    private String uploadFileName;

    @Column
    private String storedFileName;

    @Column
    private String pdfMetaData;

    @Column
    private int totalPageCount;

    @OneToMany(mappedBy = "pdf", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Quiz> quizes = new ArrayList<>();

    @Builder
    public Pdf(Long id, Member member, String uploadFileName, String storedFileName, String pdfMetaData, int totalPageCount) {
        this.id = id;
        this.member = member;
        this.uploadFileName = uploadFileName;
        this.storedFileName = storedFileName;
        this.pdfMetaData = pdfMetaData;
        this.totalPageCount = totalPageCount;
    }
}
