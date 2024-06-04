package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Schema(description = "특정 과목 과일 바구니 목록 로드 reponse")
public class SpecificFruitBasketsLoadResponse {
    private ArrayList<FruitBasketDTO> fruitBaskets;
}
