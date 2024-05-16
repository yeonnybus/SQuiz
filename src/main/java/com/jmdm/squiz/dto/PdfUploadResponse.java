package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Schema(description = "pdf 업로드 response")
public class PdfUploadResponse {
    @Schema(description = "db에 저장되는 pdfId")
    private Long pdfId;
    @Schema(description = "사용자가 pdf 업로드 할때의 이름",
    defaultValue = "운영체제1장.pdf")
    private String uploadFileName;
    @Schema(description = "pdf 쪽수",
    defaultValue = "1")
    private int totalPageCount;


    @Builder
    public PdfUploadResponse(Long pdfId, String uploadFileName, int totalPageCount) {
        this.pdfId = pdfId;
        this.uploadFileName = uploadFileName;
        this.totalPageCount = totalPageCount;
    }
}
