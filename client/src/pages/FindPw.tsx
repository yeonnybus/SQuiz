import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  sendEmailCertification,
  verifyPwSearchEmailCertification,
} from "../api/axios";

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

function FindPw() {
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [userPw, setUserPw] = useState<string | null>("test"); // userId 상태 추가
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
      const pw = await verifyPwSearchEmailCertification(
        email,
        verificationCode
      );
      setUserPw(pw); // 인증 성공 시 userId 상태 업데이트
      alert("Email verification successful.");
      //navigate("/find-id2", { state: { userId: userId } });
    } catch (error) {
      alert("Failed to verify email.");
    }
  };

  // 인증하기 버튼
  // 인증 후 리스폰스에 따라 다음페이지로 넘어가도록 구현해야함

  return (
    <CenteredContainer>
      <FormContainer>
        <h1>비밀번호 찾기</h1>
        {!userPw ? ( // userId가 없는 경우 입력 필드 표시
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
        ) : (
          <div>당신의 비밀번호는 {userPw} 입니다.</div> // userId가 있는 경우 ID 표시
        )}
        {!userPw && ( // userId가 없는 경우만 ID 찾기 버튼 표시
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
            비밀번호 찾기
          </Button>
        )}
        {userPw && ( // userId가 있는 경우 로그인 및 비밀번호 찾기 버튼 표시
          <>
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
              onClick={() => navigate("/")}
            >
              로그인 하러 가기
            </Button>
          </>
        )}
      </FormContainer>
    </CenteredContainer>
  );
}

export default FindPw;
