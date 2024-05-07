package com.jmdm.squiz.repository;

import com.jmdm.squiz.domain.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class MemberRepositoryTest {
    @Autowired
    MemberRepository memberRepository;

    @Test
    @Transactional
    void findByMemberId() {
        // 테스트용 회원 아이디
        String testMemberId = "suacho0724";

        // 테스트용 회원 데이터 생성
        Member testMember = new Member();
        testMember.setMemberId(testMemberId);
        testMember.setMemberEmail("suacho0724@gmail.com");
        testMember.setMemberPw("1234");
        testMember.setMemberName("조수아");
        testMember.setRole("ADMIN");

        // 다른 필드들도 설정해야 한다면 설정

        // 회원 데이터 저장
        memberRepository.save(testMember);

        // 회원 아이디로 회원 조회
        Member foundMember = memberRepository.findByMemberId(testMemberId);

        // 조회된 회원이 null이 아닌지 확인
        assertNotNull(foundMember);
        System.out.println(foundMember.toString());
        // 조회된 회원의 아이디와 테스트용 회원 아이디가 일치하는지 확인
        assertEquals(testMemberId, foundMember.getMemberId());

        // 필요한 경우 다른 필드들의 값도 확인할 수 있음
        // assertEquals(expectedValue, foundMember.getOtherField());
    }
}