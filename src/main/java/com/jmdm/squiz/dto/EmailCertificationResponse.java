package com.jmdm.squiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmailCertificationResponse {
    private String email;
    private String certificationNumber;
}
