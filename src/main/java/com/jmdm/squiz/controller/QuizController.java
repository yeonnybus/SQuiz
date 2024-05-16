package com.jmdm.squiz.controller;

import com.jmdm.squiz.dto.*;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.service.QuizGenerateService;
import com.jmdm.squiz.utils.ApiResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/quiz")
@Tag(name = "Quiz 관련 API", description = "quiz를 생성하고 채점하는 API입니다.")
public class QuizController {
    private final QuizGenerateService quizGenerateService;
    @PostMapping("/generate-quiz")
    @Operation(summary = "퀴즈 생성 API",
            description = "퀴즈 옵션들과 pdf정보를 request로 받아서 퀴즈를 생성하는 API입니다.")
    @ApiResponse(responseCode = "200", description = "퀴즈 생성 성공", content = @Content(schema = @Schema(implementation = QuizGenerateResponse.class)))
    public ResponseEntity<ApiResponseEntity<QuizGenerateResponse>> generateQuiz(@AuthenticationPrincipal CustomUserDetails userDetails, @Validated  @RequestBody QuizGenerateRequest request)
    throws IOException {
        String memberId = userDetails.getUsername();
        QuizGenerateResponse response = quizGenerateService.generateQuiz(memberId, request);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "퀴즈 정보입니다."));
    }


}
