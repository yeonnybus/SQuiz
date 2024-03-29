package com.jmdm.squiz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
    @GetMapping("/main")
    @ResponseBody
    public String mainPage() {
        return "main 페이지 입니다.";
    }
}
