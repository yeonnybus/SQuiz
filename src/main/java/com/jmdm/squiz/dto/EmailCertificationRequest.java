package com.jmdm.squiz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Schema(description = "이메일 인증 요청 시 사용하는 request")
public class EmailCertificationRequest {
    /*
     @NotNull : null만 허용하지 않음, "" 과 " " 허용
     @NotEmpty : null, ""를 허용하지 않음, " " 허용
     @NotBlank : null, "", " " 전부 허용하지 않음
     */
    @NotBlank(message = "이메일 입력은 필수입니다.")
    @Email(message = "이메일 형식이 올바르지 않습니다.")
    private String email;
}
