package com.jmdm.squiz.repository;

import com.jmdm.squiz.domain.FruitBasket;
import com.jmdm.squiz.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FruitBasketRepository extends JpaRepository<FruitBasket, Long> {
    List<FruitBasket> findAllByMember(Member member);
}
