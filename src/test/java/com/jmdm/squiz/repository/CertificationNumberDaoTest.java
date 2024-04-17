package com.jmdm.squiz.repository;

import com.jmdm.squiz.service.CertificationNumberDao;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@SpringBootTest
class CertificationNumberDaoTest {
    @Autowired
    private CertificationNumberDao certificationNumberDao;


    @Test
    void find_email() {
        // Given
//        String key = "suacho072";
//        String value = "testValue";
//
//        // When
//        certificationNumberDao.setData(key, value);
        String retrievedValue = certificationNumberDao.getData("suacho0724@gmail.com");

        // Then
        System.out.println("retrievedValue = " + retrievedValue);
        assert retrievedValue.equals("123456");
    }
    
//    @Test
//    void hasKey_KeyExists_ReturnsTrue() {
//        // Given
//        String email = "test@example.com";
//        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
//        when(valueOperations.get(anyString())).thenReturn("someValue");
//
//        // When
//        CertificationNumberDao dao = new CertificationNumberDao(redisTemplate);
//        boolean result = dao.hasKey(email);
//
//        // Then
//        assertTrue(result);
//        verify(redisTemplate, times(1)).hasKey(email);
//    }
//
//    @Test
//    void hasKey_KeyDoesNotExist_ReturnsFalse() {
//        // Given
//        String email = "test@example.com";
//        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
//        when(valueOperations.get(anyString())).thenReturn(null);
//
//        // When
//        CertificationNumberDao dao = new CertificationNumberDao(redisTemplate);
//        boolean result = dao.hasKey(email);
//
//        // Then
//        assertFalse(result);
//        verify(redisTemplate, times(1)).hasKey(email);
//    }
}

