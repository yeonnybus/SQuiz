package com.jmdm.squiz.domain;

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
    private SubjectType subjectType;
    private String pageKcId;

    @OneToMany(mappedBy = "pdf", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Quiz> quizes = new ArrayList<>();

    @Builder
    public Pdf(Long id, Member member, String uploadFileName, SubjectType subjectType, String pdfToText, int totalPageCount, String pageKcId) {
        this.id = id;
        setMember(member);
        this.subjectType = subjectType;
        this.uploadFileName = uploadFileName;
        this.pdfToText = pdfToText;
        this.totalPageCount = totalPageCount;
        this.pageKcId = pageKcId;
    }

    private void setMember(Member member) {
        this.member = member;
        member.getPdfs().add(this);
    }

    public void setPdfToText(String pdfToText) {
        this.pdfToText = pdfToText;
    }

    public void setPageKcId(String pageKcId) {
        this.pageKcId = pageKcId;
    }
}
