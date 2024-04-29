package com.jmdm.squiz.utils;

import com.jmdm.squiz.exception.ErrorCode;
import com.jmdm.squiz.exception.SuccessCode;
import lombok.Getter;

@Getter
public class ApiResponse <T>{
    private ApiHeader header;
    private ApiBody body;


    public ApiResponse(ApiHeader header, ApiBody<T> body) {
        this.header = header;
        this.body = body;
    }

    public ApiResponse(ApiHeader header) {
        this.header = header;
    }

    public static <T> ApiResponse<T> ok(SuccessCode successCode, T data, String msg) {
        return new ApiResponse<T>(new ApiHeader(successCode.getCode(), successCode.name()), new ApiBody(data, msg));
    }

    public static <T> ApiResponse<T> ok(SuccessCode successCode) {
        return new ApiResponse<>(new ApiHeader(successCode.getCode(), successCode.name()), new ApiBody(null, null));
    }


}
