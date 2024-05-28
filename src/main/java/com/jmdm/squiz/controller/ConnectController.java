package com.jmdm.squiz.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jmdm.squiz.dto.AiQuizGenerateResponse;
import com.jmdm.squiz.dto.CustomUserDetails;
import com.jmdm.squiz.dto.PdfUploadResponse;
import com.jmdm.squiz.enums.SubjectType;
import com.jmdm.squiz.exception.ErrorCode;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.exception.model.AiServerException;
import com.jmdm.squiz.utils.ApiResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/connect")
@Tag(name = "connect API", description = "api와의 연결을 위한 api")
public class ConnectController {
    @GetMapping("/connect-dh")
    @Operation(summary = "다현 연결 API")
    public ResponseEntity<ApiResponseEntity<Void>> uploadPdf(@AuthenticationPrincipal CustomUserDetails userDetails) {
        // post 요청할 ai 서버 url
        String aiServerUrl = "http://192.168.0.166:8000/api/v1/quiz/suababo";
        // 요청 header 설정
        HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 body 설정
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("sua", "나는 바보가 아니야!");

        // post 요청
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<MultiValueMap<String, Object>> AiRequest = new HttpEntity<>(body, headers);
        ResponseEntity<String> AiResponse = restTemplate.postForEntity(aiServerUrl, AiRequest, String.class);
        System.out.println("AiResponse = " + AiResponse);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS));
    }
}
