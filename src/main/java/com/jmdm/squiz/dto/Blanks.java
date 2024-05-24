package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Blanks {
    @Schema(defaultValue = "빈칸 1번 답")
    private String blank_1;
    @Schema(defaultValue = "빈칸 2번 답")
    private String blank_2;
    @Schema(defaultValue = "빈칸 3번 답")
    private String blank_3;
    @Schema(defaultValue = "빈칸 4번 답")
    private String blank_4;
}


