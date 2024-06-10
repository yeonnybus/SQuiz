import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Grid, IconButton } from "@mui/material";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MiniQuizExplainB from "../components/MiniQuizExplainB";
import MiniQuizExplainOx from "../components/MiniQuizExplainOx";
import ResultSummary from "../components/ResultSummary";
import MiniQuizExplain2 from "../components/MiniQuizExplain2";
import Header from "../components/Header";

interface ProblemOptions {
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

interface Blanks {
  blank_1: string;
  blank_2: string;
  blank_3: string;
  blank_4: string;
}

interface CheckedBlanks {
  chekedBlank_1: string;
  chekedBlank_2: string;
  chekedBlank_3: string;
  chekedBlank_4: string;
}

interface Problem {
  problemNo: number;
  quizType: string;
  question: string;
  options: ProblemOptions;
  content: string | null;
  answer: string;
  checkedAnswer: string;
  blanks: Blanks;
  checkedBlanks: CheckedBlanks;
  isCorrect: number;
  explanation: string;
}

interface ProblemListResponse {
  problemList: Problem[];
}

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f8df9d, #f7f0ba, #e2f3b4);
  font-family: "Pretendard Variable";
  font-display: swap;
  src: local("Pretendard Variable"),
    url("./PretendardVariable.ttf") format("ttf");
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5%;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 50px;
  border-radius: 24px;
`;

const Label = styled.div`
  display: flex;

  font-size: 24px;
  font-weight: bold;
  margin-right: 50%;
  color: black;
`;

const LabelMini3 = styled.div`
  align-items: center;
  font-size: 15px;
  color: black;
  text-align: center;
`;

const InlineS3 = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 5%;
  text-align: center;
`;

const InlineS2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

function QuizInBasket() {
  const location = useLocation();
  const jwtToken = localStorage.getItem("authToken") || "";
  const [resultObject, setResultObject] = useState<ProblemListResponse>(
    JSON.parse(location.state.stringData)
  );

  const a = resultObject.problemList[0].quizType;

  return (
    <CenteredContainer>
      <Header />
      <FormContainer>
        <InlineS2>
          <IconButton
            aria-label="forward"
            size="large"
            sx={{
              color: "gray",
              marginBottom: "1%",
              justifyContent: "start",
            }}
            onClick={() => window.history.back()}
          >
            <KeyboardArrowLeftIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Label>{resultObject.problemList[0].problemNo}</Label>
        </InlineS2>
        {a === "OX" ? (
          <MiniQuizExplainOx quiz={resultObject} />
        ) : a === "BLANK" ? (
          <MiniQuizExplainB quiz={resultObject} />
        ) : (
          <MiniQuizExplain2 quiz={resultObject} />
        )}
      </FormContainer>
    </CenteredContainer>
  );
}

export default QuizInBasket;
