package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Summary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Pdf pdf;

    private String summary;

    @Builder
    public Summary(Long id, Pdf pdf, String summary) {
        this.id = id;
        setPdf(pdf);
        this.summary = summary;
    }

    private void setPdf(Pdf pdf) {
        this.pdf = pdf;
        pdf.setSummary(this);
    }
}
