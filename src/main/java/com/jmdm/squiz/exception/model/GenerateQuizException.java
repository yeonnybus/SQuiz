package com.jmdm.squiz.exception.model;

import com.jmdm.squiz.exception.ErrorCode;

public class GenerateQuizException extends CustomException{
    public GenerateQuizException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
