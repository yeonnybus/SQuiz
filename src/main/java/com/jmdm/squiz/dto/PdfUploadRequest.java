package com.jmdm.squiz.dto;

import com.jmdm.squiz.enums.SubjectType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Schema(description = "PDF 업로드 요청")
public class PdfUploadRequest {
    @Schema(description = "업로드할 PDF 파일", required = true)
    private MultipartFile file;

    @Schema(description = "Subject Type", required = true)
    private SubjectType subjectType;
}
