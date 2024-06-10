// MainPage.tsx
import React, { useState } from "react";

import FileUpload from "../components/FileUpload";
import styled from "styled-components";
import { TextField, Autocomplete, Button } from "@mui/material";
import Header from "../components/Header";
import logo from "../assets/logo.png"; // 로고 이미지 경로를 지정하세요.
import { useLocation, useNavigate } from "react-router-dom";

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f8df9d, #f7f0ba, #e2f3b4);
  font-family: "Nanum Gothic", sans-serif;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  height: 300px;
  background-color: white;
  padding: 50px;
  border-radius: 24px;
`;

const Label = styled.div`
  display: flex;
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  font-weight: bold;
  font-size: 34px;
`;

const LabelSmall = styled.div`
  display: flex;
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  color: gray;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 80px;
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  display: flex;
  position: fixed;
  right: 29%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-bottom: 8%;
`;

const RegisterFin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <CenteredContainer>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <FormContainer>
        <Label>{`${location.state.memberName}님`}</Label>
        <Label>가입을 축하합니다</Label>
        <LabelSmall>로그인하고 모든 서비스를 이용해보세요</LabelSmall>
        <Logo src={logo} alt="Logo" />

        <Button
          variant="contained"
          size="large"
          sx={{
            color: "white",
            background: "gray",
            borderRadius: "16px",
            ":hover": { background: "#ffc450", color: "black" },
          }}
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인 하러가기
        </Button>
      </FormContainer>
    </CenteredContainer>
  );
};

export default RegisterFin;
