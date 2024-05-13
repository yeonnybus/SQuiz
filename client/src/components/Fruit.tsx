import React from "react";
import { Grid, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import styled from "styled-components";

interface Item {
  name: string;
  subject: string;
  count: number;
  borntime: string; // ISO 날짜 형식을 가정합니다.
}

interface FruitProps {
  items: Item[];
}

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
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: black;
  justify-content: center;
`;

const FruitContainer = styled.div`
  display: flex;
  justify-content: center; // 중앙 정렬
  width: 100%; // 전체 너비
`;

const LabelMini = styled.div`
  font-size: 16px;
  color: black;
`;

const LabelAcmp = styled.div`
  font-size: 16px;
  margin-left: 100px;
  color: gray;
`;
const InlineContainer = styled.div`
  display: flex;
  width: 100vh;
  align-items: center;
`;

const Fruit: React.FC<FruitProps> = ({ items }) => {
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
              <Label>{item.name}</Label>
              <InlineContainer>
                <LabelMini>과목</LabelMini>
                <LabelAcmp>{item.subject}</LabelAcmp>
              </InlineContainer>
              <InlineContainer>
                <LabelMini>개수</LabelMini>
                <LabelAcmp>{item.count}문제</LabelAcmp>
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

export default Fruit;
