package com.jmdm.squiz.utils;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class ApiBody<T>{

    private  T data;
    private  String msg;

    public ApiBody(T data, String msg) {
        this.data = data;
        this.msg = msg;
    }
}
