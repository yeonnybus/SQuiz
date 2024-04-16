import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

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
  margin-bottom: 30px;
  gap: 20px;
`;

const InlineContainer = styled.div`
  display: flex;
`;

const Register2: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  const [userPw2, setUserPw2] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPw(event.target.value);
  };
  const handlePassword2Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserPw2(event.target.value);
  };

  const requestIdCheck = () => {
    alert("사용 가능한 아이디입니다.");
    // 인증코드 요청 로직 구현
  };

  const verifyCode = () => {
    alert("회원가입이 완료되었습니둥");
    // 인증 로직 구현
  };

  return (
    <CenteredContainer>
      <FormContainer>
        <h1>Squiz 회원가입</h1>
        <VerificationInputContainer>
          <div>이름</div>
          <TextField
            variant="outlined"
            value={name}
            InputProps={{
              style: {
                borderRadius: "16px",
              },
            }}
            onChange={handleNameChange}
          />
          <div>아이디</div>
          <InlineContainer>
            <TextField
              variant="outlined"
              value={userId}
              color="secondary"
              sx={{ width: "95ch" }}
              InputProps={{
                style: {
                  borderRadius: "16px",
                },
              }}
              onChange={handleIdChange}
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
              onClick={requestIdCheck}
            >
              중복 확인
            </Button>
          </InlineContainer>

          <div>비밀번호</div>
          <TextField
            variant="outlined"
            value={userPw}
            InputProps={{
              style: {
                borderRadius: "16px",
              },
            }}
            onChange={handlePasswordChange}
          />
          <div>비밀번호확인</div>
          <TextField
            variant="outlined"
            value={userPw2}
            InputProps={{
              style: {
                borderRadius: "16px",
              },
            }}
            onChange={handlePassword2Change}
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
          onClick={verifyCode}
        >
          회원가입
        </Button>
      </FormContainer>
    </CenteredContainer>
  );
};

export default Register2;
