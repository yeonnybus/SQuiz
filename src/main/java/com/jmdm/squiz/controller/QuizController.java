package com.jmdm.squiz.controller;

import com.jmdm.squiz.dto.PdfDTO;
import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.utils.ApiResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/v1/quiz")
//public class QuizController {
//
////    @PostMapping(name = "/upload-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
////    @Operation(summary = "pdf 업로드 API",
////            description = "multipart/form-data로 pdf 파일을 입력 받아 업로드하는 API입니다.")
////    public ResponseEntity<ApiResponseEntity<PdfDTO>> uploadPdf(@RequestPart(name = "file", required = false) MultipartFile file)
////            throws IOException {
////        PdfDTO pdfDTO = pdfUploadService.uploadPdf("sua", file);
////        return ResponseEntity.ok(ApiResponseEntity.ok(SuccessCode.SUCCESS, pdfDTO, "업로드한 pdf 관련 정보입니다."));
//    }
//}
