package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Pdf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String uploadMemberId;

    @Column
    private String uploadFileName;

    @Column
    private String storedFileName;

    @Column
    private String pdfMetaData;

    public static Pdf setPdf(String uploadMemberId, String uploadFileName, String storedFileName, String pdfMetaData) {
        Pdf pdf = new Pdf();
        pdf.setUploadMemberId(uploadMemberId);
        pdf.setUploadFileName(uploadFileName);
        pdf.setStoredFileName(storedFileName);
        pdf.setPdfMetaData(pdfMetaData);
        return pdf;
    }

}
