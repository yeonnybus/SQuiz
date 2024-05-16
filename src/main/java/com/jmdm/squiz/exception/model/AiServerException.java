package com.jmdm.squiz.exception.model;

import com.jmdm.squiz.exception.ErrorCode;

public class AiServerException extends CustomException{
    public AiServerException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
