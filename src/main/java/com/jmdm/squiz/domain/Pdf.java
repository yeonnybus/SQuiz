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


    private String uploadFileName;
    private String pdfToText;
    private int totalPageCount;

    @OneToMany(mappedBy = "pdf", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Quiz> quizes = new ArrayList<>();

    @OneToMany(mappedBy = "pdf", cascade = CascadeType.REMOVE)
    private List<KC> kcs = new ArrayList<>();
    @Builder
    public Pdf(Long id, Member member, String uploadFileName,  String pdfToText, int totalPageCount) {
        this.id = id;
        setMember(member);
        this.uploadFileName = uploadFileName;
        this.pdfToText = pdfToText;
        this.totalPageCount = totalPageCount;
    }

    private void setMember(Member member) {
        this.member = member;
        member.getPdfs().add(this);
    }

    public void setPdfToText(String pdfToText) {
        this.pdfToText = pdfToText;
    }
}
