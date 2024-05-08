package com.jmdm.squiz.dto;

import lombok.Data;

@Data
public class PdfDTO {
    private String storedFileName;
    private String uploadFileName;
    private int totalPageCount;

    public static PdfDTO setPdfDTO(String storedFileName, String uploadFileName, int totalPageCount)
    {
        PdfDTO pdfDTO = new PdfDTO();
        pdfDTO.setStoredFileName(storedFileName);
        pdfDTO.setUploadFileName(uploadFileName);
        pdfDTO.setTotalPageCount(totalPageCount);
        return pdfDTO;
    }
}
