package com.jmdm.squiz.exception.model;

import com.jmdm.squiz.exception.ErrorCode;

public class NotFoundFruitBasketException extends CustomException{
    public NotFoundFruitBasketException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
