package com.jmdm.squiz.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class PdfUploadResponse {
    private Long pdfId;
    private String uploadFileName;
    private int totalPageCount;


    @Builder
    public PdfUploadResponse(Long pdfId, String uploadFileName, int totalPageCount) {
        this.pdfId = pdfId;
        this.uploadFileName = uploadFileName;
        this.totalPageCount = totalPageCount;
    }
}
