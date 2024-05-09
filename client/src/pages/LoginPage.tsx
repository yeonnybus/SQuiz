import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { login } from "../api/axios";

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
  const [loginError, setLoginError] = useState("");

  // 로그인 함수
  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      console.log("Login successful. JWT Token:", token);
      // JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem("authToken", token);
      // 로그인 성공 후 로직 (예: 메인 페이지로 리다이렉트)
      navigate("main"); // 인증 성공 후 /register2 페이지로 이동
    } catch (error) {
      setLoginError("Login failed. Please try again.");
      alert("Login failed.");
    }
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
        {loginError && <p>{loginError}</p>}
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
        <Box
          sx={{
            display: "flex", // 이 줄을 추가하여 flexbox를 활성화합니다.
            justifyContent: "center", // 버튼들을 가운데 정렬합니다. 필요에 따라 'flex-start', 'flex-end', 'space-between' 등으로 변경 가능합니다.
            alignItems: "center", // 버튼들을 세로 방향으로 중앙에 위치시킵니다.
            m: 1, // 마진을 추가합니다. 필요에 따라 조정하세요.
          }}
        >
          <Button
            sx={{
              m: 1,
              color: "gray",
              ":hover": { color: "#ffc450" },
            }}
            onClick={() => navigate("/findid")}
          >
            ID 찾기
          </Button>
          <Button
            sx={{
              m: 1,
              color: "gray",
              ":hover": { color: "#ffc450" },
            }}
            onClick={() => navigate("/findpw")}
          >
            비밀번호 찾기
          </Button>
        </Box>
      </FormContainer>
    </CenteredContainer>
  );
};

export default LoginPage;
