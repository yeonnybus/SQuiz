package com.jmdm.squiz.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jmdm.squiz.domain.Member;
import com.jmdm.squiz.domain.Pdf;
import com.jmdm.squiz.dto.AiGetTextAndClassifyKcResponse;
import com.jmdm.squiz.dto.KcDTO;
import com.jmdm.squiz.dto.PdfUploadResponse;
import com.jmdm.squiz.exception.ErrorCode;
import com.jmdm.squiz.exception.model.AiServerException;
import com.jmdm.squiz.repository.MemberRepository;
import com.jmdm.squiz.repository.PdfRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PdfUploadService {
    private final PdfRepository pdfRepository;
    private final MemberRepository memberRepository;

    @Value("${file.dir}")
    private String fileDir;

    private String getFullPath(String filename) {
        return fileDir + filename;
    }

    private String extractExt(String uploadFileName) {
        int pos = uploadFileName.lastIndexOf(".");
        return uploadFileName.substring(pos+1);
    }
    private String createStoredFileName(String uploadFileName) {
        String ext = extractExt(uploadFileName);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    private int getPageCount(MultipartFile pdf) throws IOException {
        PDDocument document = PDDocument.load(pdf.getInputStream());
        int pageCount = document.getNumberOfPages();
        document.close();
        return pageCount;
    }

    private AiGetTextAndClassifyKcResponse getTextAndKCs(Long pdfId, MultipartFile pdf) throws JsonProcessingException {
        String aiServerUrl = "http://localhost:8080/api/v1/pdf/kc";

        HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("pdfId", pdfId);
        body.add("pdf", pdf);

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(aiServerUrl, request, String.class);
        if (! response.getStatusCode().is2xxSuccessful()) {
            pdfRepository.deleteById(pdfId);
            throw new AiServerException(ErrorCode.AI_SERVER_ERROR, ErrorCode.AI_SERVER_ERROR.getMessage());
        }
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(response.getBody(), AiGetTextAndClassifyKcResponse.class);

    }

    private AiGetTextAndClassifyKcResponse aiTest(Long pdfId) {
        AiGetTextAndClassifyKcResponse response = new AiGetTextAndClassifyKcResponse();
        response.setPdfId(pdfId);
        response.setPdfToText("이것은 pdf를 OCR까지 사용해서 text로 바꾼것!");
        ArrayList<KcDTO> kcs = new ArrayList<>();
        for(int i = 1; i < 3; i++) {
            KcDTO kc = new KcDTO();
            kc.setPageNumber(i);
            kc.setKcId(123);
            kcs.add(kc);
        }
        response.setKcs(kcs);
        return response;
    }

    public PdfUploadResponse uploadPdf(String memberId, MultipartFile pdf) throws IOException {
        if (pdf.isEmpty()) {
            return null; // 파일 에러 띄우기
        }
        // pdfId 얻기 위해 저장
        String uploadFileName = pdf.getOriginalFilename();
        int totalPageCount = getPageCount(pdf);
        Member member = memberRepository.findByMemberId(memberId);
        Pdf storedPdf = Pdf.builder()
                .member(member)
                .uploadFileName(uploadFileName)
                .totalPageCount(totalPageCount)
                .build();
//        AiGetTextAndClassifyKcResponse response = getTextAndKCs(storedPdf.getId(), pdf);
        AiGetTextAndClassifyKcResponse response = aiTest(storedPdf.getId());

        // PdfToText, kc 저장
        storedPdf.setPdfToText(response.getPdfToText());
        pdfRepository.save(storedPdf);
        PdfUploadResponse pdfUploadResponse = PdfUploadResponse.builder()
                .pdfId(storedPdf.getId())
                .uploadFileName(uploadFileName)
                .totalPageCount(totalPageCount)
                .build();
        return pdfUploadResponse;
        // 업로드 파일명, 서버 저장 명 선언 및 초기화
        //application.yml에 file 저장 dir 선언 후 그 경로로
    }

}
