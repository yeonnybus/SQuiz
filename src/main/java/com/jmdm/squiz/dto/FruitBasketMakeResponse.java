package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "과일바구니 생성 response")
public class FruitBasketMakeResponse {
    private FruitBasketDTO newFruitBasket;
}
