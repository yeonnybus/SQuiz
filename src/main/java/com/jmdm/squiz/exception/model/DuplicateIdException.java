package com.jmdm.squiz.exception.model;

import com.jmdm.squiz.exception.ErrorCode;

public class DuplicateIdException extends CustomException {
    public DuplicateIdException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
