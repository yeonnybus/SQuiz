package com.jmdm.squiz.controller;

import com.jmdm.squiz.dto.*;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.service.QuizCheckService;
import com.jmdm.squiz.service.QuizGenerateService;
import com.jmdm.squiz.service.QuizListLoadService;
import com.jmdm.squiz.service.QuizProvideService;
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
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/quiz")
@Tag(name = "Quiz 관련 API", description = "quiz를 생성하고 채점하는 API입니다.")
public class QuizController {
    private final QuizGenerateService quizGenerateService;
    private final QuizCheckService quizCheckService;
    private final QuizProvideService quizProvideService;
    private final QuizListLoadService quizListLoadService;

    @PostMapping("/generate-quiz")
    @Operation(summary = "퀴즈 생성 API",
            description = "퀴즈 옵션들과 pdf정보를 request로 받아서 퀴즈를 생성하는 API입니다.")
    @ApiResponse(responseCode = "200", description = "퀴즈 생성 성공", content = @Content(schema = @Schema(implementation = QuizGenerateResponse.class)))
    public ResponseEntity<ApiResponseEntity<QuizGenerateResponse>> generateQuiz(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                                                @Validated  @RequestBody QuizGenerateRequest request) {
        String memberId = userDetails.getUsername();
        QuizGenerateResponse response = quizGenerateService.generateQuiz(memberId, request);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "퀴즈 정보입니다."));
    }

    @PostMapping("/check-quiz")
    @Operation(summary = "퀴즈 채점 API")
    @ApiResponse(responseCode = "200", description = "퀴즈 채점 성공", content = @Content(schema = @Schema(implementation = QuizCheckResponse.class)))
    public ResponseEntity<ApiResponseEntity<QuizCheckResponse>> checkQuiz(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                                          @RequestBody QuizCheckRequest request) {
        String memberId = userDetails.getUsername();
        QuizCheckResponse response = quizCheckService.checkQuiz(memberId, request);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "퀴즈 채점 결과입니다."));
    }

    @PostMapping("/quiz-detail")
    @Operation(summary = "문제 정오답 요청 API",description = "퀴즈 채점 후 각 문제 당 정오답 및 해설 정보 요청 API")
    @ApiResponse(responseCode = "200", description = "퀴즈 채점 성공", content = @Content(schema = @Schema(implementation = QuizDetailResponse.class)))
    public ResponseEntity<ApiResponseEntity<QuizDetailResponse>> getProblems(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                               @RequestBody QuizDetailRequest request) {
        String memberId = userDetails.getUsername();
        QuizDetailResponse response = quizProvideService.getQuiz(memberId, request.getQuizId());
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "채점된 문제들"));
    }

    @GetMapping("/load-quizList")
    @Operation(summary = "지난 퀴즈 목록 로드 API", description = "지난 퀴즈 목록 페이지 목록들을 불러오는 API")
    @ApiResponse(responseCode = "200", description = "지난 퀴즈목록 전송 성공", content = @Content(schema = @Schema(implementation = QuizListLoadResponse.class)))
    public ResponseEntity<ApiResponseEntity<QuizListLoadResponse>> loadQuizs(@AuthenticationPrincipal CustomUserDetails userDetails) {
        String memberId = userDetails.getUsername();
        QuizListLoadResponse response = quizListLoadService.loadQuizList(memberId);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "요청한 퀴즈 목록들"));
    }


}
