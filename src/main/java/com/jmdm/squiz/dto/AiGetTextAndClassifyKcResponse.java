package com.jmdm.squiz.dto;

import lombok.Data;

@Data
public class AiGetTextAndClassifyKcResponse {
    private Long pdfId;
    private String pdfText;
    private String pageKcId;
}
