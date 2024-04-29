import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  ); // 여기에 그라데이션 적용
  font-family: "Nanum Gothic", sans-serif;
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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(event.target.value);
  };

  const requestVerificationCode = () => {
    alert("인증코드 요청");
    // 인증코드 요청 로직 구현
  };

  //   const verifyCode = () => {
  //     alert("인증하기");
  //     // 인증 로직 구현
  //   };

  const navigate = useNavigate();
  const goToRegi2 = () => {
    navigate("/register2");
  };

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
          onClick={goToRegi2}
        >
          인증하기
        </Button>
      </FormContainer>
    </CenteredContainer>
  );
};

export default Register;
