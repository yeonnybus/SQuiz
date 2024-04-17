package com.jmdm.squiz.exception.model;

import com.jmdm.squiz.exception.ErrorCode;

public class NotFoundEmailException extends CustomException{
    public NotFoundEmailException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
