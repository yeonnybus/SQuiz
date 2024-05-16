package com.jmdm.squiz.dto;

import lombok.Data;

import java.util.ArrayList;

@Data
public class AiGetTextAndClassifyKcResponse {
    private Long pdfId;
    private String pdfToText;
    private ArrayList<KcDTO> kcs;
}
