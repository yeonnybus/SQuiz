package com.jmdm.squiz.repository;

import com.jmdm.squiz.domain.Member;
import com.jmdm.squiz.domain.Pdf;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PdfRepository extends JpaRepository<Pdf, Long> {
    void deleteAllByTotalPageCount(int num);
}
