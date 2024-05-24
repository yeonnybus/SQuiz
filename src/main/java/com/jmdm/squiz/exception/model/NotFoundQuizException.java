package com.jmdm.squiz.exception.model;

import com.jmdm.squiz.exception.ErrorCode;

public class NotFoundQuizException extends CustomException{
    public NotFoundQuizException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
