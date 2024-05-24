package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "주제별 정답률을 위한 dto")
public class CorrectPerKcDTO {
    @Schema(description = "kc 이름",defaultValue = "컴퓨터 하드웨어")
    private String kcName;

    @Schema(description = "kc 문제 수", defaultValue = "2")
    private int kcProblemNum;

    @Schema(description = "맞은 문제 수", defaultValue = "1")
    private int correctNum;

    public void correctProblem() {
        this.kcProblemNum++;
        this.correctNum++;
    }
    public void wrongProblem() {
        this.kcProblemNum++;
    }
}
