package com.jmdm.squiz.dto;

import lombok.Data;

@Data
public class AiSummaryGenerateResponse {
    private Long pdfId;
    private String summaryInMd; // 만약 html로 보내게 되면 md -> html
}
