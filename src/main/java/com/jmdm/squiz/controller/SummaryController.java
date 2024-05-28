package com.jmdm.squiz.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jmdm.squiz.dto.CustomUserDetails;
import com.jmdm.squiz.dto.SummaryGenerateResponse;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.service.SummaryService;
import com.jmdm.squiz.utils.ApiResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/summary")
@Tag(name = "요약본 API", description = "요약본을 생성하고 불러오는 API")
public class SummaryController {
    private final SummaryService summaryService;

    @GetMapping(value = "/generate")
    @Operation(summary = "요약본을 생성하는 API", description = "pdf Id를 입력받아 요약본을 생성하고 보여주는 API입니다.")
    public ResponseEntity<ApiResponseEntity<SummaryGenerateResponse>> generateSummary(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                                                      @RequestParam("pdfId") Long pdfId) throws IOException {
        String memberId = userDetails.getUsername();
        SummaryGenerateResponse response = summaryService.generateSummary(memberId, pdfId);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "summary 입니다."));
    }

    @GetMapping("/load")
    @Operation(summary = "요약본을 로드하는 API")
    public ResponseEntity<ApiResponseEntity<SummaryGenerateResponse>> loadSummary(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                                                      @RequestParam Long quizId) throws IOException {
        String memberId = userDetails.getUsername();
        SummaryGenerateResponse response = summaryService.loadSummary(quizId);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, response, "생성된 summary 입니다."));
    }
}
