package com.jmdm.squiz.dto;

import com.jmdm.squiz.enums.SubjectType;
import lombok.Data;

@Data
public class FruitBasketMakeRequest {
    private SubjectType subject;
    private String fruitBasketName;

}
