import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useLocation, useNavigate } from "react-router-dom";

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
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 350px;
  padding: 50px;
  border-radius: 24px;
`;

const FormContainer2 = styled.div`
  gap: 20px;
  width: 100vh;
  margin: 100px;
  background-color: white;
  padding: 50px;
  padding-left: 5%;
  padding-right: 5%;
  border-radius: 24px;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  display: flex;
`;

const InlineS = styled.div`
  display: flex;
  width: 80vw;
  flex-wrap: wrap; /* Flex wrap 추가 */
  justify-content: space-around; /* 여백 분배 */
`;
const InCol = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 10px; /* 여백 추가 */
`;

const InlineS2 = styled.div`
  display: flex;
  width: 80vw;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: relative;
`;

const InlineS3 = styled.div`
  display: flex;
  width: 80vw;
  justify-content: space-between;
  text-align: center;
  align-items: center;
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  min-width: 100px;
  font-size: 25px;
  font-weight: bold;
  color: black;
`;

const LabelMini = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
  font-size: 20px;
  color: black;
  text-align: center;
  justify-content: center;
`;

const LabelMini2 = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
  font-size: 20px;
  color: black;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const LabelMini3 = styled.div`
  align-items: center;
  min-width: 100px;
  font-size: 20px;
  color: black;
  text-align: center;
`;

const Label2 = styled.div`
  display: flex;
  min-width: 100px;
  font-size: 22px;
  font-weight: bold;
  color: black;
`;

const BigNum = styled.div`
  display: flex;
  font-size: 6em;
  font-weight: bold;
  color: #f57f10;
  margin-bottom: 35px;
`;

const SmallNum = styled.div`
  display: flex;
  font-size: 3em;
  font-weight: bold;
  color: gray;
`;

export interface CorrectPerKcDTO {
  kcName: string;
  kcProblemNum: number;
  correctNum: number;
}

export interface QuizResult {
  quizId: number;
  quizName: string;
  problemNum: number;
  correctNum: number;
  correctPerKcDTOS: CorrectPerKcDTO[];
}

function QuizResult() {
  const location = useLocation();
  const [resultObject, setResultObject] = useState<QuizResult>(
    JSON.parse(location.state.result)
  );
  const [onResult, setonResult] = useState<boolean>(false);

  useEffect(() => {
    console.log(resultObject);
  }, [resultObject]);

  return (
    <CenteredContainer>
      {onResult ? ( // apiSuccess 상태에 따라 조건부 렌더링
        <FormContainer>
          <img src="orange_logo.svg" alt="" width={"100px"} />
          <Label>QUIZ</Label>
          <Label>운영체제 1강</Label>
          <Button
            variant="contained"
            size="large"
            sx={{
              color: "white",
              background: "gray",
              borderRadius: "16px",
              marginLeft: "50px",
              marginRight: "50px",

              ":hover": { background: "#ffc450", color: "black" },
            }}
            onClick={() => {
              setonResult(true);
            }}
          >
            결과 보기
          </Button>
        </FormContainer>
      ) : (
        <FormContainer2>
          <InlineS>
            <Label2>Quiz</Label2>
            <Label2>운영체제 1강</Label2>
          </InlineS>
          <LabelMini>점수</LabelMini>
          <InlineS2>
            <BigNum>{resultObject.correctNum}</BigNum>
            <SmallNum>/{resultObject.problemNum}</SmallNum>
          </InlineS2>
          <InlineS3>
            <LabelMini2>주제별 정답률</LabelMini2>
            <Button
              sx={{
                color: "gray",
                ":hover": { color: "#ffc450" },
                position: "absolute",
                right: "7%",
              }}
            >
              문제보기 &gt;
            </Button>
          </InlineS3>
          <InlineS>
            {resultObject.correctPerKcDTOS.map((item, index) => (
              <InCol key={index}>
                <Gauge
                  width={150}
                  height={150}
                  value={(item.correctNum / item.kcProblemNum) * 100}
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
                <LabelMini3>{item.kcName}</LabelMini3>
              </InCol>
            ))}
          </InlineS>
        </FormContainer2>
      )}
    </CenteredContainer>
  );
}

export default QuizResult;
