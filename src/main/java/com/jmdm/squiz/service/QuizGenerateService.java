package com.jmdm.squiz.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jmdm.squiz.domain.*;
import com.jmdm.squiz.dto.*;
import com.jmdm.squiz.exception.ErrorCode;
import com.jmdm.squiz.exception.model.GenerateQuizException;
import com.jmdm.squiz.exception.model.NotFoundPdfException;
import com.jmdm.squiz.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class QuizGenerateService {
    private final MemberRepository memberRepository;
    private final PdfRepository pdfRepository;
    private final QuizRepository quizRepository;
    private final ProblemRepository problemRepository;
    private final AnswerRepository answerRepository;

    private QuizGenerateResponse aiTest(AiGenerateQuizRequest request) {
        QuizGenerateResponse response = new QuizGenerateResponse();
        ArrayList<ProblemDTO> problemDTOS = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            ProblemDTO problemDTO = getProblemDTO(i);
            problemDTOS.add(problemDTO);
        }
        response.setQuizId(request.getQuizId());
        response.setQuizType(request.getQuizGenerateRequest().getQuizType());
        response.setProblemList(problemDTOS);
        return response;
    }

    private static ProblemDTO getProblemDTO(int i) {
        ProblemDTO problemDTO = new ProblemDTO();
        problemDTO.setId(i);
        problemDTO.setKc("운영체제");
        problemDTO.setQuestion("이것은 질문입니다. 지금은 객관식");
        Choice choice = new Choice();
        choice.setA("a");
        choice.setB("b");
        choice.setC("c");
        choice.setD("d");
        problemDTO.setChoice(choice);
        ArrayList<AnswerDTO> answerDTOS = new ArrayList<>();
        AnswerDTO answerDTO = new AnswerDTO(0, "b");
        answerDTOS.add(answerDTO);
        problemDTO.setAnswerDTOS(answerDTOS);
        return problemDTO;
    }

    @Transactional
    public QuizGenerateResponse generateQuiz(QuizGenerateRequest request) throws IOException{
        // pdf 파일 load
        Long pdfId =request.getPdfId();
        Pdf pdf = pdfRepository.findById(pdfId)
                .orElseThrow(() -> new NotFoundPdfException(ErrorCode.PDF_NOT_FOUND, ErrorCode.PDF_NOT_FOUND.getMessage()));

        // quiz 저장
        Quiz quiz = saveQuizAndGetQuiz(pdf, request);

//        //post
//        QuizGenerateResponse response = postAiAndGetQuiz(quiz.getId(), pdf, request);
        AiGenerateQuizRequest aiRequest = new AiGenerateQuizRequest();
        aiRequest.setQuizGenerateRequest(request);
        aiRequest.setQuizId(quiz.getId());
        aiRequest.setPdf(convertByteArrayToMultipartFile(loadPdfFile(pdf), pdf.getStoredFileName()));
        QuizGenerateResponse response = aiTest(aiRequest);

        saveProblem(response, quiz);
        return response;
    }
    public MultipartFile convertByteArrayToMultipartFile(byte[] bytes, String fileName) {
        return new MockMultipartFile(fileName, fileName, null, bytes);
    }

    private byte[] loadPdfFile(Pdf pdf) throws IOException{
        String filePath = pdf.getPdfMetaData();
        File file = new File(filePath);
        return Files.readAllBytes(file.toPath());
    }

    private Quiz saveQuizAndGetQuiz(Pdf pdf, QuizGenerateRequest request) {
        Quiz quiz = Quiz.builder()
                .pdf(pdf)
                .quizName(request.getQuizName())
                .subject(request.getSubject())
                .startPage(request.getStartPage())
                .endPage(request.getEndPage())
                .quizType(request.getQuizType())
                .problemNum(request.getProblemNum())
                .rank(request.getRank())
                .build();
        quizRepository.save(quiz);
        return quiz;
    }


    private QuizGenerateResponse postAiAndGetQuiz(Long quizId, Pdf pdf, QuizGenerateRequest request) throws IOException{
        // post 요청할 ai 서버 url
        String aiServerUrl = "http://localhost:8080/api/v1/ai/generate-quiz";
        // 요청 header 설정
        HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // 요청 body 설정
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("quizId", quizId);
        body.add("pdf", new ByteArrayResource(loadPdfFile(pdf)));
        body.add("quizOption", request);

        // post 요청
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(aiServerUrl, requestEntity, String.class);
        if (! responseEntity.getStatusCode().is2xxSuccessful()) {
            quizRepository.deleteById(quizId);
            throw new GenerateQuizException(ErrorCode.FAIL_GENERATE_QUIZ, ErrorCode.FAIL_GENERATE_QUIZ.getMessage());
        }

        // problem, answer 저장
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(responseEntity.getBody(), QuizGenerateResponse.class);
    }

    private void saveProblem(QuizGenerateResponse response, Quiz quiz) {
        ArrayList<ProblemDTO> problemDTOS = response.getProblemList();

        for (ProblemDTO problemDTO : problemDTOS) {
            Problem problem = Problem.builder()
                    .quiz(quiz)
                    .kc(problemDTO.getKc())
                    .question(problemDTO.getQuestion())
                    .choice(problemDTO.getChoice())
                    .content(problemDTO.getContent())
                    .build();
            problemRepository.save(problem);
            // 해당 Problem에 속하는 Answer들 생성
            for (AnswerDTO answerDTO : problemDTO.getAnswerDTOS()) {
                Answer answer = Answer.builder()
                        .problem(problem) // Problem을 설정해줌
                        .answer(answerDTO.getAnswer())
                        .build();
                // Answer를 저장
                answerRepository.save(answer);
            }
        }

    }

}
