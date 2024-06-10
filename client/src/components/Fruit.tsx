import React from "react";
import { useState } from "react";
import { Grid, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loadQuizInBasket } from "../api/axios";

interface Item {
  fruitBasketId: number;
  fruitBasketName: string;
  subject: string;
  problemNum: number;
  createdAt: string; // ISO 날짜 형식을 가정합니다.
  updatedAt: string;
}

interface FruitProps {
  items: Item[];
  token: string;
}

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
  padding-top: 35px;
  padding-left: 35px;
  padding-right: 35px;
  border-radius: 32px;
`;

const Label = styled.div`
  min-width: 30vh;
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
const InlineContainer = styled.div`
  display: flex;
  width: 70vh;
  align-items: center;
`;

const Fruit: React.FC<FruitProps> = ({ items, token }) => {
  const [result, setResult] = useState<string>("");

  const [subjects, setSubjects] = useState<{ label: string; value: string }[]>([
    { label: "운영체제", value: "OPERATING_SYSTEM" },
    { label: "컴퓨터통신", value: "COMPUTER_COMMUNICATION" },
    { label: "객체지향프로그래밍", value: "OBJECT_ORIENTED_PROGRAMMING" },
    { label: "C프로그래밍", value: "C_LANGUAGE" },
  ]);

  const navigate = useNavigate();
  const handleloadQuizInBasket = async (token: string, fid: number) => {
    try {
      const response = await loadQuizInBasket(token, fid);
      console.log(response);
      const resultData = response.body.data;
      const stringData = JSON.stringify(resultData);
      console.log(stringData);
      setResult(stringData);
      console.log(result);
      navigate("/quizInBasket", {
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
        {items &&
          items.map((item, index) => {
            const subjectLabel = subjects.find(
              (subject) => subject.value === item.subject
            )?.label;

            return (
              <FormContainer>
                <Grid
                  item
                  xs={4}
                  key={index}
                  sx={{
                    width: "300px",
                  }}
                >
                  <Label>{item.fruitBasketName}</Label>
                  <InlineContainer>
                    <LabelMini>과목</LabelMini>
                    <LabelAcmp>{subjectLabel}</LabelAcmp>
                  </InlineContainer>
                  <InlineContainer>
                    <LabelMini>개수</LabelMini>
                    <LabelAcmp>{item.problemNum}문제</LabelAcmp>
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
                    onClick={() =>
                      handleloadQuizInBasket(token, item.fruitBasketId)
                    }
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

export default Fruit;
