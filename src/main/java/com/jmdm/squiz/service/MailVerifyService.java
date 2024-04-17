package com.jmdm.squiz.service;

import com.jmdm.squiz.exception.ErrorCode;
import com.jmdm.squiz.exception.model.NotFoundEmailException;
import com.jmdm.squiz.exception.model.WrongCertificationNumException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailVerifyService {
    private final CertificationNumberDao certificationNumberDao;

    public void verifyEmail(String email, String certificationNumber) {
        if (!isVerify(email, certificationNumber)) {
            throw new WrongCertificationNumException(ErrorCode.CERTIFICATION_NUM_ERROR, ErrorCode.CERTIFICATION_NUM_ERROR.getMessage());
        }
        certificationNumberDao.deleteData(email);
    }

    private boolean isVerify(String email, String certificationNumber) {
        String result = certificationNumberDao.getData(email);
        if(result == null){
            throw new NotFoundEmailException(ErrorCode.EMAIL_NOT_FOUND, ErrorCode.EMAIL_NOT_FOUND.getMessage());
        }
        return certificationNumberDao.getData(email).equals(certificationNumber);
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
