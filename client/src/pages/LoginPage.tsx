import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f8df9d, #f7f0ba, #e2f3b4);
  font-family: "Nanum Gothic", sans-serif;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  background-color: white;
  padding: 50px;
  border-radius: 24px;
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("로그인 로직 처리", username, password);
    // 로그인 로직 처리
  };

  return (
    <CenteredContainer>
      <FormContainer>
        <h1>로그인</h1>
        <TextField
          label="아이디"
          variant="outlined"
          value={username}
          InputProps={{
            style: {
              borderRadius: "16px",
            },
          }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          value={password}
          InputProps={{
            style: {
              borderRadius: "16px",
            },
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          sx={{
            color: "white",
            background: "gray",
            borderRadius: "16px",
            ":hover": { background: "#ffc450", color: "black" },
          }}
          onClick={handleLogin}
        >
          로그인
        </Button>
        <Button
          sx={{
            m: 1,
            color: "gray",
            ":hover": { color: "#ffc450" },
          }}
          onClick={() => navigate("/register")}
        >
          회원가입
        </Button>
        <Button
          sx={{
            m: 1,
            color: "gray",
            ":hover": { color: "#ffc450" },
          }}
          onClick={() => navigate("/find-id")}
        >
          ID 찾기
        </Button>
      </FormContainer>
    </CenteredContainer>
  );
};

export default LoginPage;
