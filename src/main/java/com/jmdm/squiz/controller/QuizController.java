package com.jmdm.squiz.controller;

import com.jmdm.squiz.domain.Problem;
import com.jmdm.squiz.dto.*;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.service.QuizGenerateService;
import com.jmdm.squiz.utils.ApiResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/quiz")
public class QuizController {
    private final QuizGenerateService quizGenerateService;
    @PostMapping(name = "/generate-quiz")
    @Operation(summary = "퀴즈 생성 API",
            description = "퀴즈 옵션들과 pdf정보를 request로 받아서 퀴즈를 생성하는 API입니다.")
    public ResponseEntity<ApiResponseEntity<QuizGenerateResponse>> generateQuiz(@AuthenticationPrincipal CustomUserDetails userDetails, @Validated  @RequestBody QuizGenerateRequest request)
    throws IOException {
        QuizGenerateResponse response = quizGenerateService.generateQuiz(request);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "퀴즈 정보입니다."));
    }


}
