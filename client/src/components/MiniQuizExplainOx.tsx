import React from "react";
import styled, { css } from "styled-components";
import { Grid, IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 5%;
  background-color: white;
  padding: 25px;
  padding-bottom: 15px;
  border-radius: 24px;
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  min-width: 15%;
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

const LabelMini = styled.div<LabelProps>`
  display: flex;
  align-items: center;
  min-width: 80px;
  font-size: 15px;
  margin-bottom: 25px;
  color: black;
  justify-content: start;
  border: 1px solid;
  border-color: #d9d9d9;
  border-radius: 24px;
  height: 70px;
  padding-left: 30px;
  ${(props) => getBorderStyle(props.isAnswer, props.isChecked)}
`;
const getBorderStyle = (isAnswer: boolean, isChecked: boolean) => css`
  border: ${isAnswer && isChecked
    ? "1px solid green"
    : isAnswer
    ? "1px solid green"
    : isChecked
    ? "1px solid red"
    : "1px solid #d9d9d9"};
`;
const LabelMini2 = styled.div`
  min-width: 80%;
  font-size: 16px;
  display: flex;
  color: gray;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
  margin-left: 5%;
`;

const LabelMini3 = styled.div`
  min-width: 70%;
  font-size: 16px;
  display: flex;
  color: black;
  text-align: center;
  justify-content: start;
  font-weight: bold;
  margin-top: 3%;
`;

const LabelMini4 = styled.div`
  min-width: 80%;
  font-size: 16px;
  display: flex;
  color: gray;
  justify-content: start;
  align-items: center;
  margin-top: 3%;
`;

const InlineS2 = styled.div`
  display: flex;
  justify-content: start;
`;

const InlineS3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const InCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30%;
  margin-right: 5%;
  justify-content: center;
  text-align: center;
`;

const Line = styled.div`
  border-bottom: 1px solid;
  border-color: #c3c3c3;
  width: 100%;
`;

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

interface MiniQuizExplain2Props {
  quiz: ProblemListResponse;
}

interface LabelProps {
  isAnswer: boolean;
  isChecked: boolean;
}

function MiniQuizExplain2({ quiz }: MiniQuizExplain2Props) {
  return (
    <>
      {quiz.problemList.map((item, index) => (
        <Grid container spacing={2} sx={{ padding: "5px" }} key={index}>
          <Grid item xs={6}>
            <FormContainer>
              <InlineS2>
                <Label>{`Q${index + 1}.\u00A0\u00A0\u00A0`}</Label>
                <LabelMini2>{`${item.question}`}</LabelMini2>
              </InlineS2>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ padding: "5px" }}
              >
                <Grid item xs={6}>
                  <LabelMini
                    isAnswer={item.answer === "o"}
                    isChecked={item.checkedAnswer === "o"}
                  >{`O`}</LabelMini>
                </Grid>
                <Grid item xs={6}>
                  <LabelMini
                    isAnswer={item.answer === "x"}
                    isChecked={item.checkedAnswer === "x"}
                  >{`X`}</LabelMini>
                </Grid>
              </Grid>
              <Line />
              <LabelMini3>해설</LabelMini3>
              <LabelMini4>{item.explanation}</LabelMini4>
            </FormContainer>
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default MiniQuizExplain2;
