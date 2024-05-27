import React from "react";
import styled from "styled-components";
import { Grid, IconButton } from "@mui/material";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import ResultSummary from "../components/ResultSummary";
import MiniQuizExplain2 from "../components/MiniQuizExplain2";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;

  height: 100%;
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

  font-size: 18px;
  font-weight: bold;
  margin-right: 45%;
  color: black;
`;

const LabelMini3 = styled.div`
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */

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
  return (
    <CenteredContainer>
      <FormContainer>
        <InlineS2>
          <IconButton
            aria-label="forward"
            size="small"
            sx={{
              color: "gray",
              marginBottom: "1%",
              justifyContent: "start",
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Label>운영체제 1강</Label>
        </InlineS2>
        <MiniQuizExplain2 />
      </FormContainer>
    </CenteredContainer>
  );
}

export default QuizInBasket;
