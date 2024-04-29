package com.jmdm.squiz.service;

import com.jmdm.squiz.domain.Member;
import com.jmdm.squiz.dto.CustomUserDetails;
import com.jmdm.squiz.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {

        Member member = memberRepository.findByMemberId(memberId);

        if (member != null) {
            return new CustomUserDetails(member);
        }

        return null;
    }
}
