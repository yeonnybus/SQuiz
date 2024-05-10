package com.jmdm.squiz.enums;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum SubjectType {
    OPERATING_SYSTEM(0),
    COMPUTER_COMMUNICATION(1),
    C_LANGUAGE(2),
    OBJECT_ORIENTED_PROGRAMMING(3);

    private final int subjectCode;
}
