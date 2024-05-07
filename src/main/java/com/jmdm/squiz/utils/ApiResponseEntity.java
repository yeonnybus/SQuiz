package com.jmdm.squiz.utils;

import com.jmdm.squiz.exception.SuccessCode;
import lombok.Getter;

@Getter
public class ApiResponseEntity<T>{
    private ApiHeader header;
    private ApiBody body;


    public ApiResponseEntity(ApiHeader header, ApiBody<T> body) {
        this.header = header;
        this.body = body;
    }

    public ApiResponseEntity(ApiHeader header) {
        this.header = header;
    }

    public static <T> ApiResponseEntity<T> ok(SuccessCode successCode, T data, String msg) {
        return new ApiResponseEntity<T>(new ApiHeader(successCode.getCode(), successCode.getMessage()), new ApiBody(data, msg));
    }

    public static <T> ApiResponseEntity<T> ok(SuccessCode successCode) {
        return new ApiResponseEntity<>(new ApiHeader(successCode.getCode(), successCode.getMessage()), new ApiBody(null, null));
    }


}
