package com.jmdm.squiz.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jmdm.squiz.domain.*;
import com.jmdm.squiz.dto.*;
import com.jmdm.squiz.exception.ErrorCode;
import com.jmdm.squiz.exception.model.AiServerException;
import com.jmdm.squiz.exception.model.NotFoundPdfException;
import com.jmdm.squiz.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizGenerateService {
    private final MemberRepository memberRepository;
    private final PdfRepository pdfRepository;
    private final QuizRepository quizRepository;
    private final ProblemRepository problemRepository;
    private final AnswerRepository answerRepository;

    @Transactional
    public QuizGenerateResponse generateQuiz(String memberId, QuizGenerateRequest request) throws IOException{
        // pdf 파일 load
        Long pdfId =request.getPdfId();
        Pdf pdf = pdfRepository.findById(pdfId)
                .orElseThrow(() -> new NotFoundPdfException(ErrorCode.PDF_NOT_FOUND, ErrorCode.PDF_NOT_FOUND.getMessage()));

        // member load
        Member member = memberRepository.findByMemberId(memberId);

        // quiz 저장
        Quiz quiz = saveQuizAndGetQuiz(pdf, member, request);

        //post

//        ArrayList<KcDTO> kcList = getKcList(pdf, request);
//        AiQuizGenerateResponse response = postAiAndGetQuiz(quiz.getId(), pdf, request, kcList); // ai post api 호출
        AiQuizGenerateResponse AiResponse = aiTest(quiz.getId(), request);
        saveProblem(AiResponse, quiz);
        return makeResponse(AiResponse);
    }

    private QuizGenerateResponse makeResponse(AiQuizGenerateResponse aiResponse) {
        QuizGenerateResponse response = new QuizGenerateResponse();
        response.setQuizId(aiResponse.getQuizId());
        response.setQuizType(aiResponse.getQuizType());
        response.setQuizName(aiResponse.getQuizName());
        ArrayList<ProblemDTO> problemDTOS = new ArrayList<>();
        for (AiProblemDTO aiProblemDTO : aiResponse.getProblemList()) {
            ProblemDTO problemDTO = new ProblemDTO();
            problemDTO.setProblemNumber(aiProblemDTO.getProblemNumber());
            problemDTO.setKc((aiProblemDTO.getKc()));
            problemDTO.setQuestion(aiProblemDTO.getQuestion());
            problemDTO.setChoice(aiProblemDTO.getChoice());
            problemDTO.setContent(aiProblemDTO.getContent());
            problemDTOS.add(problemDTO);
        }
        response.setProblemList(problemDTOS);
        return response;
    }

    private ArrayList<KcDTO> getKcList(Pdf pdf, QuizGenerateRequest request) {
        List<KC> kcList = pdf.getKcs();
        int startPage = request.getStartPage();
        int endPage = request.getEndPage();
        ArrayList<KcDTO> kcDtoList = new ArrayList<>();
        for (KC kc : kcList) {
            int pageNumber = kc.getPageNumber();
            if (startPage <= pageNumber && pageNumber <= endPage){
                KcDTO kcDTO = new KcDTO();
                kcDTO.setPageNumber(kc.getPageNumber());
                kcDTO.setKcId(kc.getKcId());
                kcDtoList.add(kcDTO);
            }
        }
        return kcDtoList;
    }

    private AiQuizGenerateResponse aiTest(Long quizId, QuizGenerateRequest request) {
        AiQuizGenerateResponse response = new AiQuizGenerateResponse();

        ArrayList<AiProblemDTO> aiProblemDTOS = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            AiProblemDTO aiProblemDTO = getProblemDTO(i);
            aiProblemDTOS.add(aiProblemDTO);
        }
        response.setQuizId(quizId);
        response.setQuizType(request.getQuizType());
        response.setProblemList(aiProblemDTOS);
        response.setQuizName(request.getQuizName());
        return response;
    }

    private static AiProblemDTO getProblemDTO(int i) {
        AiProblemDTO aiProblemDTO = new AiProblemDTO();
        aiProblemDTO.setProblemNumber(i + 1);
        aiProblemDTO.setKc("운영체제");
        aiProblemDTO.setQuestion("이것은 질문입니다. 지금은 객관식" + (i + 1));
        Choice choice = new Choice();
        choice.setOption_a("a");
        choice.setOption_b("b");
        choice.setOption_c("c");
        choice.setOption_d("d");
        aiProblemDTO.setChoice(choice);
        ArrayList<AnswerDTO> answerDTOS = new ArrayList<>();
        AnswerDTO answerDTO = new AnswerDTO(0, "b", "b가 정답인 이유는 내가 b라고 생각했으니까~");
        answerDTOS.add(answerDTO);
        aiProblemDTO.setAnswers(answerDTOS);
        return aiProblemDTO;
    }


    private Quiz saveQuizAndGetQuiz(Pdf pdf, Member member, QuizGenerateRequest request) {
        System.out.println(pdf);
        System.out.println(member);
        System.out.println(request);
        Quiz quiz = Quiz.builder()
                .pdf(pdf)
                .member(member)
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


    private AiQuizGenerateResponse postAiAndGetQuiz(Long quizId, Pdf pdf, QuizGenerateRequest request, ArrayList<KC> kcList) throws IOException{
        // post 요청할 ai 서버 url
        String aiServerUrl = "http://localhost:8080/api/v1/quiz";
        // 요청 header 설정
        HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // 요청 body 설정
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("quizId", quizId);
        body.add("pdf", pdf.getPdfToText());
        body.add("quizOption", request);
        body.add("kcs", kcList);

        // post 요청
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<MultiValueMap<String, Object>> AiRequest = new HttpEntity<>(body, headers);
        ResponseEntity<String> AiResponse = restTemplate.postForEntity(aiServerUrl, AiRequest, String.class);
        if (! AiResponse.getStatusCode().is2xxSuccessful()) {
            quizRepository.deleteById(quizId);
            throw new AiServerException(ErrorCode.AI_SERVER_ERROR, ErrorCode.AI_SERVER_ERROR.getMessage());
        }

        // problem, answer 저장
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(AiResponse.getBody(), AiQuizGenerateResponse.class);
    }

    private void saveProblem(AiQuizGenerateResponse response, Quiz quiz) {
        ArrayList<AiProblemDTO> aiProblemDTOS = response.getProblemList();

        for (AiProblemDTO aiProblemDTO : aiProblemDTOS) {
            Problem problem = Problem.builder()
                    .quiz(quiz)
                    .kc(aiProblemDTO.getKc())
                    .question(aiProblemDTO.getQuestion())
                    .choice(aiProblemDTO.getChoice())
                    .content(aiProblemDTO.getContent())
                    .build();
            problemRepository.save(problem);
            // 해당 Problem에 속하는 Answer들 생성
            for (AnswerDTO answerDTO : aiProblemDTO.getAnswers()) {
                Answer answer = Answer.builder()
                        .problem(problem) // Problem을 설정해줌
                        .answer(answerDTO.getAnswer())
                        .problemNumber(answerDTO.getProblemNumber())
                        .explanation(answerDTO.getExplanation())
                        .build();
                // Answer를 저장
                answerRepository.save(answer);
            }
        }

    }

}
