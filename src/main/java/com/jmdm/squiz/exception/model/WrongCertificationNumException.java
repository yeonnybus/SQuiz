package com.jmdm.squiz.exception.model;

import com.jmdm.squiz.exception.ErrorCode;

public class WrongCertificationNumException extends CustomException{
    public WrongCertificationNumException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
