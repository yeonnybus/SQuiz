import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useLocation, useNavigate } from "react-router-dom";
import { answerDetailRequest, createSummary, viewSummary } from "../api/axios";
import Header from "../components/Header";

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
  gap: 10px;
  width: 100%;
  max-width: 350px;
  padding: 30px;
  border-radius: 24px;
`;

const FormContainer2 = styled.div`
  gap: 10px;
  width: 100vh;
  background-color: white;
  padding: 30px;
  padding-left: 10%;
  padding-right: 10%;
  border-radius: 24px;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  display: flex;
`;

const InlineS = styled.div`
  display: flex;
  width: 70vw;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const InCol = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
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

const InlineS4 = styled.div`
  display: flex;
  width: 80vw;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: relative;
  gap: 20px;
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
  font-size: 16px;
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
  pdfId: number;
  summaryId: number | null; // summaryId가 null일 수 있으므로
  quizName: string;
  problemNum: number;
  correctNum: number;
  subject: string;
  totalPageNum: number;
  uploadFileName: string;
  generatedQuizNum: number;
  correctPerKcDTOS: CorrectPerKcDTO[];
}

function QuizResult() {
  const jwtToken = localStorage.getItem("authToken") || "";
  const location = useLocation();
  const [result, setResult] = useState<string>("");

  const [resultObject, setResultObject] = useState<QuizResult>(
    JSON.parse(location.state.stringData)
  );

  const [onResult, setonResult] = useState<boolean>(
    location.state?.onResult || false
  );
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(resultObject);
  }, []);

  const handleQuizResultView = async () => {
    try {
      setIsLoading(true);
      const response = await answerDetailRequest(jwtToken, resultObject.quizId);
      console.log(response.body.data);
      const detailResuslt = JSON.stringify(response.body.data);
      setResult(JSON.stringify(response.body.data));
      if (response.body.data.quizType === "BLANK") {
        navigate("/quizcommentaryblank", {
          state: { detailResuslt },
        });
      } else if (response.body.data.quizType === "OX") {
        navigate("/quizcommentaryox", {
          state: { detailResuslt },
        });
      } else {
        navigate("/quizcommentary", {
          state: { detailResuslt },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSummary = async () => {
    try {
      setIsLoading(true);
      const response = await createSummary(jwtToken, resultObject.pdfId); // 가정: createSummary API 호출
      console.log(response);
      const text = response.body.data.summary;
      console.log(text);
      navigate("/summary", {
        state: { text },
      });
      // 요약본 생성 후에 필요한 작업 수행
    } catch (error) {
      console.error("Error creating summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSummary = async () => {
    try {
      setIsLoading(true);
      const response = await viewSummary(jwtToken, resultObject.quizId); // 가정: viewSummary API 호출
      console.log(response);
      const text = response.body.data.summary;
      console.log(text);
      navigate("/summary", {
        state: { text },
      });
    } catch (error) {
      console.error("Error viewing summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenteredContainer>
      <Header />
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
              onClick={handleQuizResultView}
            >
              문제보기 &gt;
            </Button>
          </InlineS3>
          <InlineS>
            {resultObject.correctPerKcDTOS.map((item, index) => (
              <InCol key={index}>
                <Gauge
                  width={130}
                  height={130}
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
          <InlineS4>
            {resultObject.summaryId === null ? (
              <Button
                variant="contained"
                size="large"
                sx={{
                  color: "white",
                  background: "gray",
                  borderRadius: "16px",
                  ":hover": { background: "#ffc450", color: "black" },
                }}
                onClick={handleCreateSummary}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "요약본 생성하기"
                )}
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                sx={{
                  color: "white",
                  background: "gray",
                  borderRadius: "16px",
                  ":hover": { background: "#ffc450", color: "black" },
                }}
                onClick={handleViewSummary}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "요약본 확인하기"
                )}
              </Button>
            )}
            <Button
              variant="contained"
              size="large"
              sx={{
                color: "white",
                background: "gray",
                borderRadius: "16px",
                ":hover": { background: "#ffc450", color: "black" },
              }}
              onClick={() =>
                navigate("/makequiz", {
                  state: {
                    uploadedFileName: resultObject.uploadFileName,
                    pdfId: resultObject.pdfId,
                    totalPageCount: resultObject.totalPageNum,
                    selectedSubject: resultObject.subject,
                    generateQuizNum: resultObject.generatedQuizNum,
                  },
                })
              }
            >
              추가 퀴즈 생성하기
            </Button>
          </InlineS4>
        </FormContainer2>
      )}
    </CenteredContainer>
  );
}

export default QuizResult;
