package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Choice {
    @Schema(defaultValue = "a 선택지")
    private String option_a;
    @Schema(defaultValue = "b 선택지")
    private String option_b;
    @Schema(defaultValue = "c 선택지")
    private String option_c;
    @Schema(defaultValue = "d 선택지")
    private String option_d;
}
