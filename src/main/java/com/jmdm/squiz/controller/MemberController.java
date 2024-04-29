package com.jmdm.squiz.controller;

import com.jmdm.squiz.domain.Member;
import com.jmdm.squiz.dto.MemberDTO;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.service.CertificationGenerator;
import com.jmdm.squiz.service.MemberService;
import com.jmdm.squiz.utils.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {
    // 생성자 주입
    private final MemberService memberService;


    @PostMapping("/check-id-duplication")
    public ResponseEntity<ApiResponse<Void>> checkIdDuplication(
            @RequestParam(name = "memberId") String memberId
    ) {
        memberService.checkDuplication(memberId);
        return ResponseEntity.ok(ApiResponse.ok(SuccessCode.SUCCESS));
    }

    @PostMapping("/join")
    public ResponseEntity<ApiResponse<Member>> joinMember(@Valid @RequestBody MemberDTO request) {
        Member response = memberService.joinMember(request);
        return ResponseEntity.ok(ApiResponse.ok(SuccessCode.SUCCESS, response, "db에 저장된 값"));
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
