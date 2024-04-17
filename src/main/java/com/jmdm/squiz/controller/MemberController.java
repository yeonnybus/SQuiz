package com.jmdm.squiz.controller;

import com.jmdm.squiz.dto.MemberDTO;
import com.jmdm.squiz.service.CertificationGenerator;
import com.jmdm.squiz.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class MemberController {
    // 생성자 주입
    private final MemberService memberService;
    // 회원가입 페이지 출력 요청

//    @GetMapping("/email")
//    public String showEmailForm() {
//        return "email";
//    }
//
//    @PostMapping("/sendCode")
//    public String sendVerifyingCode() {
//    }

    @GetMapping("/join")
    public String saveForm() {
        return "join";
    }

    @PostMapping("/join")
    public String save(@ModelAttribute MemberDTO memberDTO) {
        memberService.save(memberDTO);
        return "login";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

//    @PostMapping("/member/login")
//    public String login(@ModelAttribute MemberDTO memberDTO) {
//        MemberDTO loginResult = memberService.login(memberDTO);
//        if (loginResult != null) {
//            // login 성공
//            return "main";
//        } else {
//            // login 실패
//            return "login";
//        }
//    }
}
