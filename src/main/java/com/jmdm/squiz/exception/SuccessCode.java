package com.jmdm.squiz.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SuccessCode {
    SUCCESS(HttpStatus.OK, "성공"),
    EMAIL_SEND_SUCCESS(HttpStatus.OK, "인증코드 전송 완료")
    ;

    private final HttpStatus code;
    private final String message;
}
