package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class LikeList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "questionFruitBasketId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "questionId", nullable = false)
    private Question questionId;

    @ManyToOne
    @JoinColumn(name = "fruitBasketId", nullable = false)
    private FruitBasket fruitBasketId;
}
