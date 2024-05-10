package com.jmdm.squiz.dto;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Choice {
    private String a;
    private String b;
    private String c;
    private String d;
}
