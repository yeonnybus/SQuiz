package com.jmdm.squiz.service;

import com.jmdm.squiz.exception.ErrorCode;
import com.jmdm.squiz.exception.model.NotFoundEmailException;
import com.jmdm.squiz.exception.model.WrongCertificationNumException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailVerifyService {
    private final RedisService redisService;

    public void verifyEmail(String email, String certificationNumber) {
        if (!isVerify(email, certificationNumber)) {
            throw new WrongCertificationNumException(ErrorCode.CERTIFICATION_NUM_ERROR, ErrorCode.CERTIFICATION_NUM_ERROR.getMessage());
        }
        redisService.deleteData(email); // 인증이 완료되면 회원가입 될 때까지 영구 저장
    }

    private boolean isVerify(String email, String certificationNumber) {
        String result = (String)redisService.getData(email);
        if(result == null){
            throw new NotFoundEmailException(ErrorCode.EMAIL_NOT_FOUND, ErrorCode.EMAIL_NOT_FOUND.getMessage());
        }
        return result.equals(certificationNumber);
//        boolean validatedEmail = isEmailExists(email);
//        System.out.println("validatedEmail = " + validatedEmail);
//        if (!validatedEmail) {
//            throw new NotFoundEmailException(ErrorCode.EMAIL_NOT_FOUND, ErrorCode.EMAIL_NOT_FOUND.getMessage());
//        }
//        return (certificationNumberDao.getData(email).equals(certificationNumber));
    }

//    private boolean isEmailExists(String email) {
//        return certificationNumberDao.getData(email);
//    }


}
