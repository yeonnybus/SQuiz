package com.jmdm.squiz.domain;

import com.jmdm.squiz.repository.QuizRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class QuizTest {
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private QuizRepository quizRepository;

    @Test
    @Rollback
    public void 삭제_테스트() {
        quizRepository.deleteById(1L);
        entityManager.flush();
        entityManager.clear();

        // Then (퀴즈가 삭제되었는지 확인)
        List<Quiz> quizzes = quizRepository.findAllById(List.of(1L));
        assertEquals(0, quizzes.size()); // 퀴즈가 존재하지 않아야 함

    }

}