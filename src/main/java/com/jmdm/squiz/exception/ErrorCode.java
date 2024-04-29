package com.jmdm.squiz.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    CERTIFICATION_NUM_ERROR(HttpStatus.BAD_REQUEST, "인증번호가 일치하지 않습니다."),
    ID_ERROR(HttpStatus.BAD_REQUEST, "이미 존재하는 아이디입니다."),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "이메일이 존재하지 않습니다.")
    ;

    private final HttpStatus code;
    private final String message;

    public int getHttpStatusCode() {return code.value();}


}