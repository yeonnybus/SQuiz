package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class FruitBasket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fruitBasketId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member memberId;

    @Column
    private String basketName;

    @OneToMany(mappedBy = "fruitBasketId")
    private List<LikeList> questionList = new ArrayList<>();

    private LocalDateTime createdDate;
}
