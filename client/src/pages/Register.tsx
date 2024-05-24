import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { sendEmailCertification, verifyEmailCertification } from "../api/axios";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // 전체 화면 높이
  background: linear-gradient(
    to bottom right,
    #f8df9d,
    #f7f0ba,
    #e2f3b4
  ); // 여기에 그라데이션 적용z
  font-family: "Pretendard Variable";
  font-display: swap;
  src: local("Pretendard Variable"),
    url("./PretendardVariable.ttf") format("ttf");
  font-weight: 400;
  font-style: normal;
`;

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%; // 부모 요소의 너비를 따라 가로로 전체 너비를 차지
  max-width: 500px; // 최대 너비 설정
  background-color: white;
  padding: 50px;
  border-radius: 24px;
`;

const VerificationInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 200px;
  gap: 20px;
`;

const InlineContainer = styled.div`
  display: flex;
`;

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const navigate = useNavigate();

  // 사용가 입력한 이메일을 email state에 저장
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // 사용자가 입력한 인증코드를 verficationCode state에 저장
  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(event.target.value);
  };

  // 인증코드 요청 onclick 동작 함수
  const requestVerificationCode = async () => {
    try {
      await sendEmailCertification(email);
      alert("이메일 인증 요청을 성공적으로 보냈습니다.");
    } catch (error) {
      alert("이메일 인증 요청에 실패했습니다.");
    }
  };

  //다음 페이지로 넘어가기. 인증번호가 맞으면 넘어갈 수 있도록 해야함!

  const handleVerifyEmail = async () => {
    try {
      await verifyEmailCertification(email, verificationCode);
      alert("Email verification successful.");
      navigate("/register2", { state: { email: email } }); // 인증 성공 후 /register2 페이지로 이동
    } catch (error) {
      alert("Failed to verify email.");
    }
  };

  // 인증하기 버튼
  // 인증 후 리스폰스에 따라 다음페이지로 넘어가도록 구현해야함

  return (
    <CenteredContainer>
      <FormContainer>
        <h1>Squiz 회원가입</h1>
        <VerificationInputContainer>
          <div>이메일</div>
          <InlineContainer>
            <TextField
              variant="outlined"
              value={email}
              color="secondary"
              sx={{ width: "95ch" }}
              InputProps={{
                style: {
                  borderRadius: "16px",
                },
              }}
              onChange={handleEmailChange}
            />
            <Button
              variant="contained"
              size="small"
              sx={{
                m: 1,
                color: "white",
                background: "gray",
                borderRadius: "16px",
                ":hover": { background: "#ffc450", color: "black" },
                width: "30ch",
              }}
              onClick={requestVerificationCode}
            >
              인증코드요청
            </Button>
          </InlineContainer>
          <div>인증번호입력</div>
          <TextField
            variant="outlined"
            value={verificationCode}
            InputProps={{
              style: {
                borderRadius: "16px",
              },
            }}
            onChange={handleVerificationCodeChange}
          />
        </VerificationInputContainer>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            m: 1,
            color: "white",
            background: "gray",
            borderRadius: "16px",
            ":hover": { background: "#ffc450", color: "black" },
          }}
          onClick={handleVerifyEmail}
        >
          인증하기
        </Button>
      </FormContainer>
    </CenteredContainer>
  );
};

export default Register;
