package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
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

    @Builder
    public FruitBasketProblem(Long id, FruitBasket fruitBasket, Problem problem) {
        this.id = id;
        setFruitBasket(fruitBasket);
        setProblem(problem);
    }

    private void setFruitBasket(FruitBasket fruitBasket) {
        this.fruitBasket = fruitBasket;
        fruitBasket.getFruitBasketProblems().add(this);
        fruitBasket.setProblemNum(fruitBasket.getProblemNum() + 1);
    }

    private void setProblem(Problem problem) {
        this.problem = problem;
        problem.getFruitBasketProblems().add(this);
    }
}
