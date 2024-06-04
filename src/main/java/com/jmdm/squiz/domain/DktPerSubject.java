package com.jmdm.squiz.domain;

import com.jmdm.squiz.enums.SubjectType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DktPerSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    private SubjectType subjectType;

    @OneToMany(mappedBy = "dktPerSubject",cascade = CascadeType.REMOVE)
    private List<DktList> dktLists = new ArrayList<>();

    @Builder
    public DktPerSubject(Long id, Member member, SubjectType subjectType, List<DktList> dktLists) {
        this.id = id;
        setMember(member);
        this.subjectType = subjectType;
        this.dktLists = dktLists;
    }
     private void setMember(Member member) {
        this.member = member;
        member.getDktPerSubjects().add(this);
    }
    // dktLists가 null인 경우 초기화하는 메서드
    public List<DktList> getDktLists() {
        if (dktLists == null) {
            dktLists = new ArrayList<>();
        }
        return dktLists;
    }
}
