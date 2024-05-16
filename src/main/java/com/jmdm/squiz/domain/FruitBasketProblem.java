package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class FruitBasketProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fruitBasket_id")
    private FruitBasket fruitBasket;

    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem problem;


}
