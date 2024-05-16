package com.jmdm.squiz.domain;

import com.jmdm.squiz.repository.PdfRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PdfTest {

    @Autowired
    PdfRepository pdfRepository;

    @Test
    public void 삭제_테스트() {
        pdfRepository.deleteById(1L);

        // Then (퀴즈가 삭제되었는지 확인)
        assertFalse(pdfRepository.existsById(1L));
    }

}