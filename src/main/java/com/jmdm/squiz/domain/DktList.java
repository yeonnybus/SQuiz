package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class DktList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dkt_per_subject_id")
    private DktPerSubject dktPerSubject;

    private int kcId;
    private float predict;

    @Builder
    public DktList(Long id, DktPerSubject dktPerSubject, int kcId, float predict) {
        this.id = id;
        setDktPerSubject(dktPerSubject);
        this.kcId = kcId;
        this.predict = predict;
    }

    private void setDktPerSubject(DktPerSubject dktPerSubject) {
        this.dktPerSubject = dktPerSubject;
        dktPerSubject.getDktLists().add(this);
    }

    public void setPredict(float predict) {
        this.predict = predict;
    }
}
