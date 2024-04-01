package com.jmdm.squiz.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memberId")
    private Long id;

    @Column
    private String userName;

    @Column(unique = true)
    private String loginId;

    @Column
    private String loginPw;

    @Column(unique = true)
    private String email;

    @Column
    private LocalDateTime createDate;

//    @PrePersist
//    protected void onCreate() {
//        createDate = LocalDateTime.now();
//    }

    // 생성자 추가
//    public Member(String userName, String loginId, String loginPw, String email) {
//        this.userName = userName;
//        this.loginId = loginId;
//        this.loginPw = loginPw;
//        this.email = email;
//    }
}