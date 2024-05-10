package com.jmdm.squiz.exception.model;

import com.jmdm.squiz.exception.ErrorCode;

public class NotFoundPdfException extends CustomException{
    public NotFoundPdfException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
