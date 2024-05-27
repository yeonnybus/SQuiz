package com.jmdm.squiz.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SpecificFruitBasketsLoadResponse {
    private ArrayList<FruitBasketDTO> fruitBaskets;
}
