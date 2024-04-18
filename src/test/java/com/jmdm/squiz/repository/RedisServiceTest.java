package com.jmdm.squiz.repository;

import com.jmdm.squiz.service.RedisService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RedisServiceTest {
    @Autowired
    private RedisService redisService;


    @Test
    void find_email() {
        // Given
//        String key = "suacho072";
//        String value = "testValue";
//
//        // When
//        certificationNumberDao.setData(key, value);
        String retrievedValue = redisService.getData("suacho0724@gmail.com");

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
//        RedisService dao = new RedisService(redisTemplate);
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
//        RedisService dao = new RedisService(redisTemplate);
//        boolean result = dao.hasKey(email);
//
//        // Then
//        assertFalse(result);
//        verify(redisTemplate, times(1)).hasKey(email);
//    }
}

