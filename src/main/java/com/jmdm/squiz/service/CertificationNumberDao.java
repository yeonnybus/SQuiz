package com.jmdm.squiz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class CertificationNumberDao {
    private static final long EMAIL_VERIFICATION_LIMIT_IN_SECONDS = 180; // 유효기간 3분
    private final RedisTemplate<String, String> redisTemplate;

    public String getData(String key){//지정된 키(key)에 해당하는 데이터를 Redis에서 가져오는 메서드
        ValueOperations<String,String> valueOperations=redisTemplate.opsForValue();
        return valueOperations.get(key);
    }
    public void setData(String key,String value){//지정된 키(key)에 값을 저장하는 메서드
        ValueOperations<String,String> valueOperations=redisTemplate.opsForValue();
        valueOperations.set(key,value,EMAIL_VERIFICATION_LIMIT_IN_SECONDS);
    }

    public void deleteData(String key){//지정된 키(key)에 해당하는 데이터를 Redis에서 삭제하는 메서드
        redisTemplate.delete(key);
    }

//    public void saveCertificationNumber(String email, String certificationNumber) {
//        redisTemplate.opsForValue()
//                .set(email, certificationNumber,
//                        Duration.ofSeconds(EMAIL_VERIFICATION_LIMIT_IN_SECONDS));
//    }
//
//    public String getCertificationNumber(String email) {
//        return redisTemplate.opsForValue().get(email);
//    }
//
//    public void removeCertificationNumber(String email) {
//        redisTemplate.delete(email);
//    }
//
//    public Boolean hasKey(String email) {
//        System.out.println("email = " + email);
//        Boolean keyExists = redisTemplate.hasKey(email);
//        System.out.println("keyExists = " + keyExists);
//        System.out.println(redisTemplate.opsForValue().get(email));
//        return keyExists != null && keyExists;
//    }
}
