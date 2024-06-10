import React from "react";
import { Grid, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { checkQuizResult } from "../api/axios";

const FruitContainer = styled.div`
  display: flex;
  justify-content: center; // 중앙 정렬
  width: 100%; // 전체 너비
  font-family: "Pretendard Variable";
  font-display: swap;
  src: local("Pretendard Variable"),
    url("./PretendardVariable.ttf") format("ttf");
`;

const FormContainer = styled.div`
  display: flex;

  margin: 5px;
  background-color: white;
  padding-bottom: 5px;
  padding-top: 25px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 32px;
`;

const Label = styled.div`
  width: 330px;
  display: flex;

  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: black;
`;

const LabelMini = styled.div`
  font-size: 16px;
  color: black;
`;

const LabelAcmp = styled.div`
  font-size: 16px;
  margin-left: 50px;
  color: gray;
`;

const LabelAcmp2 = styled.div`
  font-size: 16px;
  margin-left: 17px;
  color: gray;
`;

const InlineContainer = styled.div`
  display: flex;
  width: 330px;
  align-items: center;
`;

export interface Quiz {
  quizId: number;
  quizName: string;
  subjectType: string;
  problemNum: number;
  correctNum: number;
  weakPart: string[];
  createdAt: string;
  uploadFileName: string;
}

export interface QuizListResponse {
  quizList: Quiz[];
  token: string;
}

const QuizList: React.FC<QuizListResponse> = ({ quizList, token }) => {
  const [result, setResult] = useState<string>("");

  const [subjects, setSubjects] = useState<{ label: string; value: string }[]>([
    { label: "운영체제", value: "OPERATING_SYSTEM" },
    { label: "컴퓨터통신", value: "COMPUTER_COMMUNICATION" },
    { label: "객체지향프로그래밍", value: "OBJECT_ORIENTED_PROGRAMMING" },
    { label: "C프로그래밍", value: "C_LANGUAGE" },
  ]);

  const navigate = useNavigate();
  const handleloadQuizResult = async (token: string, qid: number) => {
    try {
      const response = await checkQuizResult(token, qid);
      console.log(response);
      const resultData = response.body.data;
      const stringData = JSON.stringify(resultData);
      console.log(stringData);
      setResult(stringData);
      console.log(result);
      navigate("/quizresult", {
        state: { stringData },
      });
    } catch (error) {
      console.error("Error adding new fruit basket:", error);
    }
  };

  return (
    <FruitContainer>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", rowGap: "1em", columnGap: "2em" }}
      >
        {quizList &&
          quizList.map((item, index) => {
            const subjectLabel = subjects.find(
              (subject) => subject.value === item.subjectType
            )?.label;

            return (
              <FormContainer key={index}>
                <Grid
                  item
                  xs={4}
                  sx={{
                    width: "300px",
                  }}
                >
                  <Label>{item.quizName}</Label>
                  <InlineContainer>
                    <LabelMini>과목</LabelMini>
                    <LabelAcmp>{subjectLabel}</LabelAcmp>
                  </InlineContainer>
                  <InlineContainer>
                    <LabelMini>점수</LabelMini>
                    <LabelAcmp>
                      {item.correctNum} / {item.problemNum}
                    </LabelAcmp>
                  </InlineContainer>
                  <InlineContainer>
                    <LabelMini>취약 파트</LabelMini>
                    <LabelAcmp2>{item.weakPart.join(", ")}</LabelAcmp2>
                  </InlineContainer>
                  <IconButton
                    aria-label="forward"
                    size="small"
                    sx={{
                      marginTop: "30px",
                      marginLeft: "250px",
                      backgroundColor: "black",
                      color: "white",
                      marginBottom: "20px",
                    }}
                    onClick={() => {
                      handleloadQuizResult(token, item.quizId);
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Grid>
              </FormContainer>
            );
          })}
      </Grid>
    </FruitContainer>
  );
};

export default QuizList;
