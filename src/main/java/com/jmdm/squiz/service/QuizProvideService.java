package com.jmdm.squiz.service;

import com.jmdm.squiz.domain.Problem;
import com.jmdm.squiz.domain.Quiz;
import com.jmdm.squiz.dto.ProblemAnswerDTO;
import com.jmdm.squiz.dto.QuizDetailResponse;
import com.jmdm.squiz.exception.ErrorCode;
import com.jmdm.squiz.exception.model.NotFoundPdfException;
import com.jmdm.squiz.exception.model.NotFoundQuizException;
import com.jmdm.squiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizProvideService {
    private final QuizRepository quizRepository;

    public QuizDetailResponse getQuiz(String memberId, Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new NotFoundQuizException(ErrorCode.QUIZ_NOT_FOUND, ErrorCode.QUIZ_NOT_FOUND.getMessage()));
        List<Problem> problems = quiz.getProblems();
        ArrayList<ProblemAnswerDTO> problemAnswerDTOS = new ArrayList<>();
        for (Problem problem : problems) {
            ProblemAnswerDTO problemAnswerDTO = ProblemAnswerDTO.builder()
                    .problemNo(problem.getProblemNo())
                    .quizType(quiz.getQuizType())
                    .question(problem.getQuestion())
                    .options(problem.getOptions())
                    .content(problem.getContent())
                    .answer(problem.getAnswer())
                    .checkedAnswer(problem.getCheckedAnswer())
                    .blanks(problem.getBlanks())
                    .checkedBlanks(problem.getCheckedBlanks())
                    .isCorrect(problem.getCorrect())
                    .build();
            problemAnswerDTOS.add(problemAnswerDTO);
        }
        return QuizDetailResponse.builder()
                .quizId(quizId)
                .quizType(quiz.getQuizType())
                .quizName(quiz.getQuizName())
                .problemNum(quiz.getProblemNum())
                .problemList(problemAnswerDTOS)
                .build();
    }

}
