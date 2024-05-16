package com.jmdm.squiz.domain;

import com.jmdm.squiz.dto.MemberDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String memberEmail;

    @Column
    private String memberName;

    @Column(unique = true)
    private String memberId;

    @Column
    private String memberPw;

    @Column
    private String role;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Pdf> pdfs = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Quiz> Quizs = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<FruitBasket> fruitBaskets = new ArrayList<>();


    public static Member toMember(MemberDTO memberDTO, BCryptPasswordEncoder bCryptPasswordEncoder){
        Member member = new Member();
        member.setMemberEmail(memberDTO.getMemberEmail());
        member.setMemberName(memberDTO.getMemberName());
        member.setMemberId(memberDTO.getMemberId());
        member.setMemberPw(bCryptPasswordEncoder.encode(memberDTO.getMemberPw()));
        member.setRole(memberDTO.getRole());
        return member;

    }
}