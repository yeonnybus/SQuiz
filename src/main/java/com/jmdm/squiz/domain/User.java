package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    private Long id;

    @Column
    private String userName;

    @Column
    private String loginId;

    @Column
    private String loginPw;

    @Column
    private String email;

    private LocalDateTime createDate;
}
