package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "과일 바구니 목록")
public class FruitBasketsLoadResponse {
    private List<FruitBasketDTO> fruitBaskets;
}
