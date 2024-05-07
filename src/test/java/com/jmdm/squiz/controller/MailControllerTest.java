package com.jmdm.squiz.controller;

import com.jmdm.squiz.dto.EmailCertificationRequest;
import com.jmdm.squiz.dto.EmailCertificationResponse;
import com.jmdm.squiz.service.MailSendService;
import com.jmdm.squiz.service.MailVerifyService;
import com.jmdm.squiz.utils.ApiResponseEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MailControllerTest {
    @Mock
    private MailSendService mailSendService;

    @Mock
    private MailVerifyService mailVerifyService;

    @InjectMocks
    private MailController mailController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSendCertificationNumber() throws Exception {
        // Mock the behavior of the mailSendService
        EmailCertificationResponse response = new EmailCertificationResponse();
        when(mailSendService.sendEmailForCertification(any(String.class))).thenReturn(response);

        // Create a request object
        EmailCertificationRequest request = new EmailCertificationRequest();
        request.setEmail("suacho0724@gmail.com");

        // Call the controller method
        ResponseEntity<ApiResponseEntity<EmailCertificationResponse>> result = mailController.sendCertificationNumber(request);

        // Verify that the response is as expected
        assert result.getStatusCode().equals(HttpStatus.OK);
        assert result.getBody().getBody().getData().equals(response);

    }

}