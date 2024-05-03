package com.jmdm.squiz.controller;

import com.jmdm.squiz.exception.SuccessCode;
import com.jmdm.squiz.service.PdfUploadService;
import com.jmdm.squiz.utils.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/upload")
@Tag(name = "upload API", description = "현재는 pdf 업로드 API만 구현되어있습니다.")
public class UploadController {
    private final PdfUploadService pdfUploadService;

    @PostMapping("/upload-pdf")
    @Operation(summary = "pdf 업로드 API",
                description = "multipart/form-data로 pdf 파일을 입력 받아 업로드하는 API입니다.")
    public ResponseEntity<ApiResponse<Void>> uploadPdf(@RequestPart("file" )MultipartFile file)
    throws IOException {
        pdfUploadService.uploadPdf("sua", file);
        return ResponseEntity.ok(ApiResponse.ok(SuccessCode.SUCCESS));
    }
// 파일 디렉토리 서버로 바꾸고 아래처럼 CustomUserDetails로 받아와야댐~ 또한 엔티티끼리 의존성도 연결해야댐
//    @PostMapping("/upload-pdf")
//    @Operation(summary = "pdf 업로드 API",
//            description = "multipart/form-data로 pdf 파일을 입력 받아 업로드하는 API입니다.")
//    public ResponseEntity<ApiResponse<Void>> uploadPdf(@AuthenticationPrincipal CustomUserDetails userDetails, @ModelAttribute PdfDTO pdfDto)
//            throws IOException {
//        String memberId = userDetails.getUsername();
//        pdfUploadService.uploadPdf(memberId, pdfDto.getPdf());
//        return ResponseEntity.ok(ApiResponse.ok(SuccessCode.SUCCESS));
//    }

}
