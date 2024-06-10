import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import logo from "../assets/startLogo.png"; // 로고 이미지 경로를 지정하세요.
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f8df9d, #f7f0ba, #e2f3b4);
  font-family: "Pretendard Variable";
  font-display: swap;
  src: local("Pretendard Variable"),
    url("./PretendardVariable.ttf") format("ttf");
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
  text-align: center;
  margin-bottom: 50px;
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
  height: 40%;
  width: 65.6%;
  display: flex;
  right: 29%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const First = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const messages = [
    "Squiz, 나만을 위한 문제로 능동적인 학습 경험을 제공합니다 :)",
    "Squiz한 지식을 단숨에 Drink!",
    "Squiz ~ ? Yes !",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <CenteredContainer>
      <Logo src={logo} alt="Logo" />
      <Label>{messages[currentMessageIndex]}</Label>
      <HeaderWrapper onClick={() => navigate("/login")}>
        <Button
          disableRipple
          disableFocusRipple
          disableElevation
          sx={{
            m: 1,
            color: "black",
            fontSize: "24px",
            ":hover": {
              background: "none", // hover 상태에서도 배경색을 동일하게 유지
              color: "none", // hover 상태에서도 텍스트 색상을 동일하게 유지
            },
          }}
        >
          로그인하기
        </Button>
        <IconButton
          aria-label="forward"
          size="small"
          disableRipple
          disableFocusRipple
          sx={{
            color: "gray",
          }}
        >
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
      </HeaderWrapper>
    </CenteredContainer>
  );
};

export default First;
