package com.jmdm.squiz.utils;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public class ApiHeader {

    private final HttpStatus resultCode;
    private final String codeName;

}
