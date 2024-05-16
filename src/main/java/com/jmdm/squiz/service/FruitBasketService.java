package com.jmdm.squiz.service;

import com.jmdm.squiz.domain.FruitBasket;
import com.jmdm.squiz.domain.Member;
import com.jmdm.squiz.dto.FruitBasketDTO;
import com.jmdm.squiz.dto.FruitBasketsLoadResponse;
import com.jmdm.squiz.repository.FruitBasketRepository;
import com.jmdm.squiz.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FruitBasketService {
    private final MemberRepository memberRepository;
    private final FruitBasketRepository fruitBasketRepository;

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
}
