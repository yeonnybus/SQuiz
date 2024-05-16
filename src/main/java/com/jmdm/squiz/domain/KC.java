package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class KC {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pdf_id")
    private Pdf pdf;

    private int pageNumber;
    private int kcId;

    @Builder
    public KC(Long id, Pdf pdf, int pageNumber, int kcId) {
        this.id = id;
        setPdf(pdf);
        this.pageNumber = pageNumber;
        this.kcId = kcId;
    }

    private void setPdf(Pdf pdf) {
        this.pdf = pdf;
        pdf.getKcs().add(this);
    }
}
