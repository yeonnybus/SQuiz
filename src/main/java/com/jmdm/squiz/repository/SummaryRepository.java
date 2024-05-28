package com.jmdm.squiz.repository;

import com.jmdm.squiz.domain.Pdf;
import com.jmdm.squiz.domain.Summary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SummaryRepository extends JpaRepository<Summary, Long> {
    Summary findByPdf(Pdf pdf);
}
