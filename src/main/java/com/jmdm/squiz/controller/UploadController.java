package com.jmdm.squiz.controller;

import com.jmdm.squiz.dto.CustomUserDetails;
import com.jmdm.squiz.dto.PdfUploadResponse;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.service.PdfUploadService;
import com.jmdm.squiz.utils.ApiResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/upload")
@Tag(name = "upload API", description = "현재는 pdf 업로드 API만 구현되어있습니다.")
public class UploadController {
    private final PdfUploadService pdfUploadService;

    @PostMapping(value = "/upload-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "pdf 업로드 API",
            description = "multipart/form-data로 pdf 파일을 입력 받아 업로드하는 API입니다. jwt 토큰 헤더에 보내야합니다~")
    public ResponseEntity<ApiResponseEntity<PdfUploadResponse>> uploadPdf(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestPart(name = "file", required = false ) MultipartFile file)
            throws IOException {
        PdfUploadResponse pdfUploadResponse = pdfUploadService.uploadPdf(userDetails.getUsername(), file);
        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, pdfUploadResponse, "업로드한 pdf 관련 정보입니다."));
    }

}
