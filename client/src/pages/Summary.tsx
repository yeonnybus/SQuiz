import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { TextField, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Header from "../components/Header";

// 스타일 정의
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(to bottom right, #f8df9d, #f7f0ba, #e2f3b4);
  font-family: "Pretendard Variable";
  font-display: swap;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 55vw;
  margin: 3vh;
  background-color: white;
  padding: 10px;
  border-radius: 24px;
  position: relative; /* 상대적으로 배치 */
  align-items: start;
  text-align: start;
  justify-content: start;
  padding-left: 8%;
  padding-right: 8%;
  padding-top: 4%;

  font-size: 16px;
  line-height: 1.6;
  color: #333;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.5em 0 1em;
    line-height: 1.25;
  }

  p {
    margin: 0.5em 0;
  }

  ul,
  ol {
    padding-left: 1.5em;
    margin: 0.5em 0;
    list-style-position: inside; /* 불릿과 텍스트를 가깝게 배치 */
  }

  li {
    margin-bottom: 0.5em; /* 리스트 아이템 간의 간격을 조절 */
  }

  code {
    background-color: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }

  pre {
    background-color: #f5f5f5;
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
  }

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    border-left: 4px solid #ddd;
    padding: 0.5em 1em;
    color: #666;
    margin: 0.8em 0;
  }
`;

const FormContainerNew = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 1vh;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px;
  border-radius: 24px;
  align-items: center;
  text-align: center;
`;

const Inline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5%;
`;

const Inline2 = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  padding-top: 2vh;
`;

const LabelBig = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
  font-size: 30px;
  font-weight: bold;
  color: black;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-left: 35px;
  color: black;
  justify-content: start;
`;

// 선택지 라벨 스타일
const getBorderStyle = (isAnswer: boolean, isChecked: boolean) => css`
  border: ${isAnswer && isChecked
    ? "2px solid green"
    : isAnswer
    ? "2px solid green"
    : isChecked
    ? "2px solid red"
    : "1px solid #d9d9d9"};
`;

const LabelMini2 = styled.div`
  display: flex;
  align-items: center;
  min-width: 80px;
  font-size: 13px;
  color: gray;
  justify-content: start;
  padding-left: 17.5%;
  padding-top: 1%;
`;

const LabelModal = styled.div`
  display: flex;
  align-items: center;
  min-width: 80px;
  font-size: 18px;
  margin-bottom: 3%;
  color: gray;
`;

const LabelQuestion = styled.div`
  display: flex;
  min-width: 80px;
  font-size: 17px;
  margin-left: 6%;
  margin-top: 0.3%;
  color: black;
  justify-content: start;
`;

const style = {
  position: "absolute" as "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f7f7f7",
  boxShadow: 24,
  p: 10,
  borderRadius: "24px",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const VerticalLine = styled.div`
  border-bottom: 1px solid gray; /* 세로선 */
  width: 90%;
  margin-left: 3.5vw;
`;

const LabelSolution = styled.div`
  font-size: 16px;
  margin-left: 6%;
  color: gray;
  max-width: 90%;
  text-align: start;
  padding-bottom: 2%;
`;

function Summary() {
  // 프론트단 관리 state
  const location = useLocation();
  const [markdownContent, setMarkdownContent] = useState<string>(
    location.state.text
  );

  const jwtToken = localStorage.getItem("authToken") || "";
  const navigate = useNavigate();

  const handleBefore = () => {};

  return (
    <CenteredContainer>
      <Header />
      <FormContainerNew>
        <Inline>
          <IconButton
            aria-label="backward"
            size="small"
            sx={{
              color: "gray",
            }}
            onClick={() => {
              navigate(-1); // 뒤로 가기
            }}
          >
            <ArrowBackIosNewOutlinedIcon />
          </IconButton>
          <LabelBig>QUIZ</LabelBig>
        </Inline>
        <FormContainer>
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </FormContainer>
      </FormContainerNew>
    </CenteredContainer>
  );
}

export default Summary;
