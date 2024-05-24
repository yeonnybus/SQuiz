package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
@Schema(description = "선택한 빈칸 답")
public class CheckedBlanks {
    @Schema(defaultValue = "입력한 빈칸 1번 답")
    private String chekedBlank_1;
    @Schema(defaultValue = "입력한 빈칸 2번 답")
    private String chekedBlank_2;
    @Schema(defaultValue = "입력한 빈칸 3번 답")
    private String chekedBlank_3;
    @Schema(defaultValue = "입력한 빈칸 4번 답")
    private String chekedBlank_4;

    public boolean equalsBlanks(Blanks blanks) {
        return this.chekedBlank_1.equals(blanks.getBlank_1()) &&
               this.chekedBlank_2.equals(blanks.getBlank_2()) &&
               this.chekedBlank_3.equals(blanks.getBlank_3()) &&
               this.chekedBlank_4.equals(blanks.getBlank_4());
    }
}
