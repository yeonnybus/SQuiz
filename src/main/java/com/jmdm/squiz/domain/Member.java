package com.jmdm.squiz.domain;

import com.jmdm.squiz.dto.MemberDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column
    private String password;

    @Column(unique = true)
    private String username;

    @Column
    private String role;

    public static Member toMember(MemberDTO memberDTO, BCryptPasswordEncoder bCryptPasswordEncoder){
        Member member = new Member();
        member.setPassword(bCryptPasswordEncoder.encode(memberDTO.getPassword()));
        member.setUsername(memberDTO.getUsername());
        member.setRole("ROLE_ADMIN");
        return member;

    }
}