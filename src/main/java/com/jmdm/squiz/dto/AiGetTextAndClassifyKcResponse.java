package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Ai 서버로 부터 받는 pdf 텍스트와 페이지 당 kc 분류 결과를 담는 response")
public class AiGetTextAndClassifyKcResponse {
    @Schema(description = "db에 저장되는 해당 pdf 인덱스")
    private Long pdfId;
    private String pdfText;
    private String pageKcId;
}
