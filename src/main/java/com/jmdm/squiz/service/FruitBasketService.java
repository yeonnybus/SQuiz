package com.jmdm.squiz.service;

import com.jmdm.squiz.domain.FruitBasket;
import com.jmdm.squiz.domain.FruitBasketProblem;
import com.jmdm.squiz.domain.Member;
import com.jmdm.squiz.domain.Problem;
import com.jmdm.squiz.dto.*;
import com.jmdm.squiz.exception.ErrorCode;
import com.jmdm.squiz.exception.model.NotFoundFruitBasketException;
import com.jmdm.squiz.exception.model.NotFoundProblemException;
import com.jmdm.squiz.exception.model.NotFoundQuizException;
import com.jmdm.squiz.repository.FruitBasketProblemRepository;
import com.jmdm.squiz.repository.FruitBasketRepository;
import com.jmdm.squiz.repository.MemberRepository;
import com.jmdm.squiz.repository.ProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FruitBasketService {
    private final MemberRepository memberRepository;
    private final FruitBasketRepository fruitBasketRepository;
    private final FruitBasketProblemRepository fruitBasketProblemRepository;
    private final ProblemRepository problemRepository;

    public FruitBasketsLoadResponse loadFruitBasket(String memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        List<FruitBasket> fruitBaskets = fruitBasketRepository.findAllByMember(member);
        List<FruitBasketDTO> fruitBasketDTOS = new ArrayList<>();
        for(FruitBasket fruitBasket: fruitBaskets) {
            FruitBasketDTO fruitBasketDTO = FruitBasketDTO.builder()
                    .fruitBasketId(fruitBasket.getId())
                    .fruitBasketName(fruitBasket.getFruitBasketName())
                    .subject(fruitBasket.getSubject())
                    .problemNum(fruitBasket.getProblemNum())
                    .createdAt(fruitBasket.getCreatedAt())
                    .updatedAt(fruitBasket.getUpdatedAt())
                    .build();
            fruitBasketDTOS.add(fruitBasketDTO);
        }
        FruitBasketsLoadResponse response = new FruitBasketsLoadResponse();
        response.setFruitBaskets(fruitBasketDTOS);
        return response;
    }

    public FruitBasketMakeResponse makeFruitBasket(String memberId, FruitBasketMakeRequest request) {
        Member member = memberRepository.findByMemberId(memberId);
        FruitBasket fruitBasket = FruitBasket.builder()
                .fruitBasketName(request.getFruitBasketName())
                .subject(request.getSubject())
                .problemNum(0)
                .member(member)
                .build();
        fruitBasketRepository.save(fruitBasket);
        FruitBasketDTO newFruitBasket = FruitBasketDTO.builder()
                .fruitBasketId(fruitBasket.getId())
                .fruitBasketName(fruitBasket.getFruitBasketName())
                .subject(fruitBasket.getSubject())
                .problemNum(fruitBasket.getProblemNum())
                .createdAt(fruitBasket.getCreatedAt())
                .updatedAt(fruitBasket.getUpdatedAt())
                .build();
        FruitBasketMakeResponse response = new FruitBasketMakeResponse();
        response.setNewFruitBasket(newFruitBasket);
        return response;
    }

    public SpecificFruitBasketsLoadResponse loadSpecificFruitBaskets(String memberId, SpecificFruitBasketLoadRequest request) {
        Member member = memberRepository.findByMemberId(memberId);
        List<FruitBasket> fruitBaskets = member.getFruitBaskets();
        ArrayList<FruitBasketDTO> fruitBasketDTOS = new ArrayList<>();
        for (FruitBasket fruitBasket : fruitBaskets) {
            if (fruitBasket.getSubject().equals(request.getSubject())) {
                FruitBasketDTO dto = FruitBasketDTO.builder()
                        .fruitBasketId(fruitBasket.getId())
                        .fruitBasketName(fruitBasket.getFruitBasketName())
                        .subject(fruitBasket.getSubject())
                        .problemNum(fruitBasket.getProblemNum())
                        .createdAt(fruitBasket.getCreatedAt())
                        .updatedAt(fruitBasket.getUpdatedAt())
                        .build();
                fruitBasketDTOS.add(dto);
            }
        }
        SpecificFruitBasketsLoadResponse response = new SpecificFruitBasketsLoadResponse();
        response.setFruitBaskets(fruitBasketDTOS);
        return response;
    }

    public void addProblem(String memberId, ProblemAddRequest request) {
        FruitBasket fruitBasket = fruitBasketRepository.findById(request.getFruitBasketId())
                .orElseThrow(() -> new NotFoundFruitBasketException(ErrorCode.FRUIT_BASKET_NOT_FOUND, ErrorCode.FRUIT_BASKET_NOT_FOUND.getMessage()));
        Problem problem = problemRepository.findById(request.getProblemId())
                .orElseThrow(() -> new NotFoundProblemException(ErrorCode.PROBLEM_NOT_FOUND, ErrorCode.PROBLEM_NOT_FOUND.getMessage()));
        FruitBasketProblem fruitBasketProblem = FruitBasketProblem.builder()
                .fruitBasket(fruitBasket)
                .problem(problem)
                .build();
        fruitBasketProblemRepository.save(fruitBasketProblem);
    }
}
