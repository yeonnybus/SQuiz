package com.jmdm.squiz.repository;

import com.jmdm.squiz.domain.Pdf;
import com.jmdm.squiz.domain.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
}
