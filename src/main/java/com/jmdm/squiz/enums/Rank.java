package com.jmdm.squiz.enums;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum Rank {
    LOWER(0),
    MIDDLE(1),
    UPPER(2);

    private final int rankNum;
}
