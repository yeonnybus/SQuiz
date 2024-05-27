import React from "react";
import { Grid, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import styled from "styled-components";

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

const QuizList: React.FC<FruitProps> = ({ items }) => {
  return (
    <FruitContainer>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", rowGap: "1em", columnGap: "2em" }}
      >
        {items.map((item, index) => (
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
                <LabelAcmp>{item.subject}</LabelAcmp>
              </InlineContainer>
              <InlineContainer>
                <LabelMini>점수</LabelMini>
                <LabelAcmp>1 / {item.problemNum}</LabelAcmp>
              </InlineContainer>
              <InlineContainer>
                <LabelMini>취약 파트</LabelMini>
                <LabelAcmp2>가상메모리, 덧셈</LabelAcmp2>
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
              >
                <ArrowForwardIcon />
              </IconButton>
            </Grid>
          </FormContainer>
        ))}
      </Grid>
    </FruitContainer>
  );
};

export default QuizList;
