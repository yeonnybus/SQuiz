package com.jmdm.squiz.controller;

import com.jmdm.squiz.dto.EmailCertificationRequest;
import com.jmdm.squiz.dto.EmailCertificationResponse;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.service.MailSendService;
import com.jmdm.squiz.service.MailVerifyService;
import com.jmdm.squiz.utils.ApiResponse;
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
@Tag(name = "Mail Authentication", description = "Mail Authentication API")
public class MailController {
    private final MailSendService mailSendService;
    private final MailVerifyService mailVerifyservice;

    @PostMapping("/send-certification")
    @Operation(summary = "인증 코드를 전송", description = "사용자의 이메일로 인증코드를 전송하는 API")
    public ResponseEntity<ApiResponse<EmailCertificationResponse>> sendCertificationNumber(@Validated @RequestBody EmailCertificationRequest request)
            throws MessagingException, NoSuchAlgorithmException {
        EmailCertificationResponse response = mailSendService.sendEmailForCertification(request.getEmail());
        return ResponseEntity.ok(ApiResponse.OK(SuccessCode.SUCCESS, response, "인증할 메일과 인증 코드"));
    }

    @PostMapping("/verify")
    @Operation(summary = "인증코드 확인", description = "인증코드가 올바른지 확인하는 API")
    public ResponseEntity<ApiResponse<Void>> verifyCertificationNumber(
            @RequestParam(name = "email") String email,
            @RequestParam(name = "certificationNumber") String certificationNumber
    ) {
        mailVerifyservice.verifyEmail(email, certificationNumber);

        return ResponseEntity.ok(ApiResponse.OK(SuccessCode.SUCCESS));
    }
}
