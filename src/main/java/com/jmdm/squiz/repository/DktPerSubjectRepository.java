package com.jmdm.squiz.repository;

import com.jmdm.squiz.domain.DktPerSubject;
import com.jmdm.squiz.domain.Member;
import com.jmdm.squiz.enums.SubjectType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DktPerSubjectRepository extends JpaRepository<DktPerSubject, Long> {
    Boolean existsByMemberAndSubjectType(Member member, SubjectType subjectType);
    DktPerSubject findByMemberAndSubjectType(Member member, SubjectType subjectType);
}
