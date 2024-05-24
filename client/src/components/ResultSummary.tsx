import React from "react";
import styled from "styled-components";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { Grid, IconButton } from "@mui/material";

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 87%; // 부모 요소의 너비를 따라 가로로 전체 너비를 차지

  background-color: white;
  padding: 30px;
  border-radius: 24px;
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  font-size: 24px;
  font-weight: bold;

  color: black;
`;

const LabelMini2 = styled.div`
  min-width: 70%; /* 필요하다면 최소 너비 지정 */
  font-size: 16px;
  display: flex;
  color: gray;
  justify-content: center;
  text-align: center;
`;

const LabelMini3 = styled.div`
  min-width: 70%; /* 필요하다면 최소 너비 지정 */
  font-size: 14px;
  display: flex;
  color: black;
  text-align: center;
  justify-content: center;
`;

const InlineS2 = styled.div`
  display: flex;
  align-items: center;
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

function ResultSummary() {
  return (
    <FormContainer>
      <Label>퀴즈 결과</Label>
      <InlineS2>
        <Gauge
          width={150}
          height={150}
          value={50}
          cornerRadius="50%"
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 20,
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#314CF1",
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: theme.palette.text.disabled,
            },
          })}
        />
        <InCol>
          <InlineS3>
            <LabelMini2>주제</LabelMini2>
            <LabelMini2>정답률</LabelMini2>
          </InlineS3>
          <InlineS3>
            <LabelMini3>1234567890</LabelMini3>
            <LabelMini3>3/5</LabelMini3>
          </InlineS3>
          <InlineS3>
            <LabelMini3>baaaaaaaaa</LabelMini3>
            <LabelMini3>3/5</LabelMini3>
          </InlineS3>
        </InCol>
      </InlineS2>
    </FormContainer>
  );
}

export default ResultSummary;
