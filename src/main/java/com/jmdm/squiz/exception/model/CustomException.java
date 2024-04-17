package com.jmdm.squiz.exception.model;

import com.jmdm.squiz.exception.ErrorCode;
import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{
    private final ErrorCode errorCode;
    public CustomException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public Integer getHttpStatus() {
        return errorCode.getHttpStatusCode();
    }
}
