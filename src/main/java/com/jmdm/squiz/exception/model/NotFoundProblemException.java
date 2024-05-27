package com.jmdm.squiz.exception.model;

import com.jmdm.squiz.exception.ErrorCode;

public class NotFoundProblemException extends CustomException{
    public NotFoundProblemException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
