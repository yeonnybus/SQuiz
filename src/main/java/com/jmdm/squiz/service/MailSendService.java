package com.jmdm.squiz.service;

import com.jmdm.squiz.dto.EmailCertificationResponse;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;


@Service
@RequiredArgsConstructor
public class MailSendService {
    private final JavaMailSender mailSender;
    private final RedisService redisService;
    private final CertificationGenerator generator;
    private static final String DOMAIN_NAME = "http://localhost:8080";
    public EmailCertificationResponse sendEmailForCertification(String email)
            throws NoSuchAlgorithmException, MessagingException {
        String certificationNumber = generator.createCertificationGenerator();
        String content = "인증코드" +
                "<br><br>" +
                "인증 번호는 <h3>" + certificationNumber + "</h3>입니다." +
                "<br><br>" +
                "인증번호를 3분 안에 입력해주세요"; //이메일 내용 삽입
        redisService.setData(email, certificationNumber);
        sendMail(email, content, "Squiz : 인증 코드 전송");
        return new EmailCertificationResponse(email, certificationNumber);
    }


    public void sendMail(String email, String content, String subject) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(mimeMessage);
    }

}
