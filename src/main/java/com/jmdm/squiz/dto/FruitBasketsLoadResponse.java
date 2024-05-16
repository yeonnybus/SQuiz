package com.jmdm.squiz.dto;

import lombok.Data;

import java.util.List;

@Data
public class FruitBasketsLoadResponse {
    private List<FruitBasketDTO> fruitBaskets;
}
