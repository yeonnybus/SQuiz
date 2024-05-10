package com.jmdm.squiz.controller;

import com.jmdm.squiz.domain.Member;
import com.jmdm.squiz.dto.EmailCertificationRequest;
import com.jmdm.squiz.dto.EmailCertificationResponse;
import com.jmdm.squiz.dto.MemberDTO;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.service.MailSendService;
import com.jmdm.squiz.service.MailVerifyService;
import com.jmdm.squiz.service.MemberService;
import com.jmdm.squiz.utils.ApiResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {
    // 생성자 주입
    private final MemberService memberService;
    private final MailVerifyService mailVerifyService;

    @Tag(name = "회원가입 API", description = "아이디가 중복을 체크하고 회원가입을 하는 API입니다.")
    @GetMapping("/check-id-duplication")
    @Operation(summary = "아이디 중복 체크", description = "parameter로 아이디를 받아서 중복 체크하는 API")
    public ResponseEntity<ApiResponseEntity<Void>> checkIdDuplication(
            @RequestParam(name = "memberId") String memberId
    ) {
        memberService.checkDuplication(memberId);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS));
    }

    @Tag(name = "회원가입 API", description = "아이디가 중복을 체크하고 회원가입을 하는 API입니다.")
    @PostMapping("/join")
    @Operation(summary = "회원가입", description = "json으로 사용자 정보를 받아 회원가입을 진행하는 API")
    public ResponseEntity<ApiResponseEntity<Member>> joinMember(@Valid @RequestBody MemberDTO request) {
        Member response = memberService.joinMember(request);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "db에 저장된 값"));
    }
    @Tag(name = "ID/PW찾기 API", description = "ID/PW 찾는 API입니다.")
    @PostMapping("/find-id")
    @Operation(summary = "ID 찾기", description = "이메일 인증 후 이메일을 body로 받아서 아이디를 반환하는 API")
    public ResponseEntity<ApiResponseEntity<Map<String, String>>> findId(@Valid @RequestBody EmailCertificationResponse request) {
        mailVerifyService.verifyEmail(request.getEmail(), request.getCertificationNumber());
        Map<String, String> response = memberService.findMemberId(request.getEmail());
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "요청한 아이디"));
    }
    @Tag(name = "ID/PW찾기 API", description = "ID/PW 찾는 API입니다.")
    @PostMapping("/find-pw")
    @Operation(summary = "PW 찾기", description = "이메일 인증 후에 아이디를 입력 받으면 새로운 비밀번호를 생성하는 API입니다.")
    public ResponseEntity<ApiResponseEntity<Map<String, String>>> findPW(@Valid @RequestBody EmailCertificationResponse request)
            throws MessagingException {
        mailVerifyService.verifyEmail(request.getEmail(), request.getCertificationNumber());
        Map<String, String> response = memberService.createNewPw(request.getEmail());
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "새로운 비밀번호 생성 완료"));
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
