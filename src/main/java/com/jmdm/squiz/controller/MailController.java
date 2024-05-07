package com.jmdm.squiz.controller;

import com.jmdm.squiz.dto.EmailCertificationRequest;
import com.jmdm.squiz.dto.EmailCertificationResponse;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.service.MailSendService;
import com.jmdm.squiz.service.MailVerifyService;
import com.jmdm.squiz.utils.ApiResponseEntity;
import io.swagger.v3.oas.annotations.Operation;

import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;

@RestController //@Controller + @ResponseBody
@RequiredArgsConstructor
@RequestMapping("/api/v1/email")
@Tag(name = "이메일 인증 API", description = "이메일 인증 코드를 전송하고, 인증코드를 검증하는 API입니다.")
public class MailController {
    private final MailSendService mailSendService;
    private final MailVerifyService mailVerifyservice;

    @PostMapping("/send-certification")
    @Operation(summary = "인증 코드를 전송", description = "사용자의 이메일로 인증코드를 전송하는 API")
    public ResponseEntity<ApiResponseEntity<EmailCertificationResponse>> sendCertificationNumber(@Validated @RequestBody EmailCertificationRequest request)
            throws MessagingException, NoSuchAlgorithmException {
        EmailCertificationResponse response = mailSendService.sendEmailForCertification(request.getEmail());
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.EMAIL_SEND_SUCCESS, response, "인증할 메일과 인증 코드"));
    }

    @PostMapping("/verify")
    @Operation(summary = "인증코드 확인", description = "인증코드가 올바른지 확인하는 API")
    public ResponseEntity<ApiResponseEntity<Void>> verifyCertificationNumber(@RequestBody EmailCertificationResponse request) {
        mailVerifyservice.verifyEmail(request.getEmail(), request.getCertificationNumber());
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS));
    }
}
