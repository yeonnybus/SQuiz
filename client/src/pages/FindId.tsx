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
function FindId() {
  return (
    <CenteredContainer>
      <FormContainer>
        <h1>ID찾기</h1>
      </FormContainer>
    </CenteredContainer>
  );
}

export default FindId;
