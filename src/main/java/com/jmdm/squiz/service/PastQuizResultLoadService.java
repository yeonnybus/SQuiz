package com.jmdm.squiz.service;

import com.jmdm.squiz.domain.Problem;
import com.jmdm.squiz.domain.Quiz;
import com.jmdm.squiz.dto.CorrectPerKcDTO;
import com.jmdm.squiz.dto.QuizCheckResponse;
import com.jmdm.squiz.enums.KC;
import com.jmdm.squiz.exception.ErrorCode;
import com.jmdm.squiz.exception.model.NotFoundQuizException;
import com.jmdm.squiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PastQuizResultLoadService {
    private final QuizRepository quizRepository;
    private final QuizCheckService quizCheckService;
    @Transactional
    public QuizCheckResponse loadPastQuizResult(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new NotFoundQuizException(ErrorCode.QUIZ_NOT_FOUND, ErrorCode.QUIZ_NOT_FOUND.getMessage()));
        // 해당 퀴즈의 문제들 불러오고 문제 번호 순으로 정렬
        List<Problem> problems = quiz.getProblems();
        problems.sort(Comparator.comparingInt(Problem::getProblemNo));
        List<CorrectPerKcDTO> correctPerKcDTOS = getCorrectPerKcDTO(problems);
        return quizCheckService.makeResponse(quiz, correctPerKcDTOS);
    }

    private List<CorrectPerKcDTO> getCorrectPerKcDTO(List<Problem> problems) {
        Map<String, CorrectPerKcDTO> correctPerKcMap = new HashMap<>();

        for (Problem problem : problems) {
            String targetKcName = KC.fromId(problem.getKcId());
            System.out.println("targetKcName = " + targetKcName);
            CorrectPerKcDTO dto = correctPerKcMap.computeIfAbsent(targetKcName, k -> {
                CorrectPerKcDTO newDto = new CorrectPerKcDTO();
                newDto.setKcName(k);
                newDto.setKcProblemNum(0);
                return newDto;
            });
            System.out.println("dto = " + dto);

            if (problem.getCorrect() == 1) {
                dto.correctProblem();
            } else {
                dto.wrongProblem();
            }
        }
        return new ArrayList<>(correctPerKcMap.values());
    }
}
