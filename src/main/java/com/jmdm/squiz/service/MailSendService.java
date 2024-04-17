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
    private final CertificationNumberDao certificationNumberDao;
    private final CertificationGenerator generator;
    private static final String DOMAIN_NAME = "http://localhost:8080";
    public EmailCertificationResponse sendEmailForCertification(String email)
            throws NoSuchAlgorithmException, MessagingException {
        String certificationNumber = generator.createCertificationGenerator();
        String content = String.format("%s/api/v1/email/verify?certificationNumber=%s&email=%s   링크를 3분 이내에 클릭해주세요.", DOMAIN_NAME, certificationNumber, email);
        certificationNumberDao.setData(email, certificationNumber);
        sendMail(email, content);
        return new EmailCertificationResponse(email, certificationNumber);
    }

    private void sendMail(String email, String content) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setTo(email);
        helper.setSubject("mail title");
        helper.setText(content);
        mailSender.send(mimeMessage);
    }

}
