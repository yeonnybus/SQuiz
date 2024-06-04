package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema()
public class ProblemsLoadRequest {
    private Long fruitBasketId;
}
