package com.jmdm.squiz.service;

import com.jmdm.squiz.domain.Member;
import com.jmdm.squiz.dto.EmailCertificationResponse;
import com.jmdm.squiz.dto.MemberDTO;
import com.jmdm.squiz.exception.ErrorCode;
import com.jmdm.squiz.exception.model.DuplicateIdException;
import com.jmdm.squiz.repository.MemberRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MailSendService mailSendService;
    private static final String LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String NUMBERS = "0123456789";
     static final String SPECIAL_CHARACTERS = "!@#$%^&*()-_=+";

    public void checkDuplication(String memberId) {
        if (isDuplicate(memberId)) {
            throw new DuplicateIdException(ErrorCode.ID_ERROR, ErrorCode.ID_ERROR.getMessage());
        }
    }

    private boolean isDuplicate(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }

    public Member joinMember(MemberDTO request) {
        Member response = Member.toMember(request, bCryptPasswordEncoder);
        memberRepository.save(response);
        return response;
    }

    public Map<String, String> findMemberId(String email) {
        Map<String, String> response = new HashMap<>();
        Member member = memberRepository.findByMemberEmail(email);
        response.put("memberId", member.getMemberId());
        return response;
    }

    public Map<String, String> createNewPw(String email) throws MessagingException {
        Map<String, String> response = new HashMap<>();
        Member member = memberRepository.findByMemberEmail(email);
        String newPw = generateTemporaryPw();
        member.setMemberPw(bCryptPasswordEncoder.encode(newPw));
        memberRepository.save(member);
        String content = "임시 비밀 번호" +
                "<br><br>" +
                "임시비밀번호는 <h3>" + newPw + "</h3>입니다." +
                "<br><br>" +
                "로그인 후 비밀번호 변경해주세요";
        String subject = "Squiz : 새로운 임시 비밀번호";
        mailSendService.sendMail(email, content, subject);
        response.put("temporaryPw", newPw);
        return response;
    }

    private String generateTemporaryPw() {
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        // 임시 비밀번호에 사용될 문자열 생성
        String validCharacters = LOWERCASE_CHARACTERS + UPPERCASE_CHARACTERS + NUMBERS;

        // 임시 비밀번호 생성
        for (int i = 0; i < 8; i++) {
            int randomIndex = random.nextInt(validCharacters.length());
            password.append(validCharacters.charAt(randomIndex));
        }

        return password.toString();
    }
}
