import React from "react";
import styled from "styled-components";
import { Grid, IconButton } from "@mui/material";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import ResultSummary from "../components/ResultSummary";
import MiniQuizExplain from "../components/MiniQuizExplain";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
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

  width: 80vw;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 50px;
  border-radius: 24px;
`;

const MiniFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  width: 14vw;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  display: flex;

  text-align: center;

  font-size: 18px;
  font-weight: bold;

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

const Left = styled.div`
  margin-top: 5%;
  margin-right: 3%;
`;

function QuizDetail() {
  return (
    <CenteredContainer>
      <FormContainer>
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
          지난 퀴즈 목록
        </IconButton>
        <Label>운영체제 1강</Label>
        <InlineS2>
          <Left>
            <ResultSummary />
            <InlineS3>
              <MiniFormContainer>
                <LabelMini3>한 눈에</LabelMini3>
                <LabelMini3>내용을 정리할 수 있는</LabelMini3>
                <Label>요약본 생성</Label>
              </MiniFormContainer>
              <MiniFormContainer>
                <LabelMini3>취약한 부분을</LabelMini3>
                <LabelMini3>보완할 수 있는</LabelMini3>
                <Label>추가 퀴즈 생성</Label>
              </MiniFormContainer>
            </InlineS3>
          </Left>

          <MiniQuizExplain />
        </InlineS2>
      </FormContainer>
    </CenteredContainer>
  );
}

export default QuizDetail;
