package com.jmdm.squiz.enums;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum QuizType {
    BLANK(0),
    MULTIPLE_CHOICE(1),
    OX(2);

    private final int quizTypeCode;
}
