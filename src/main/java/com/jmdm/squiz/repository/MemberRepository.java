package com.jmdm.squiz.repository;

import com.jmdm.squiz.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// <관련 엔티티, pk 형식>
public interface MemberRepository extends JpaRepository<Member, Long> {
    // 이메일로 회원 정보 조회
//    Optional<Member> findByMemberEmail(String memberEmail);
//    Boolean existsByMemberEmail(String memberEmail);
    Boolean existsByMemberId(String memberId);
    Member findByMemberEmail(String memberEmail);
    Member findByMemberId(String memberId);
}
