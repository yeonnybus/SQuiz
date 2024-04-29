package com.jmdm.squiz.dto;

import com.jmdm.squiz.domain.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MemberDTO {
    @NotBlank
    private String memberEmail;
    @NotBlank
    private String memberName;
    @NotBlank
    private String memberId;
    @NotEmpty
    @Size(min = 8, max = 20, message = "비밀번호는 8자 이상 20자 이하여야 합니다.")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$", message = "비밀번호는 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.")
    private String memberPw;
    private String role;


    public static MemberDTO toMemberDTO(Member member) {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setMemberEmail(member.getMemberEmail());
        memberDTO.setMemberName(member.getMemberName());
        memberDTO.setMemberId(member.getMemberId());
        memberDTO.setMemberPw(member.getMemberPw());
        memberDTO.setRole(member.getRole());
        return memberDTO;
    }
}
