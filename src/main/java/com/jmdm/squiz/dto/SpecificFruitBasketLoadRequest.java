package com.jmdm.squiz.dto;

import com.jmdm.squiz.enums.SubjectType;
import lombok.Data;

@Data
public class SpecificFruitBasketLoadRequest {
    private SubjectType subject;
}
