import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Button } from "@mui/material";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { orderQuiz } from "../api/axios";
import Header from "../components/Header";

// 스타일드 컴포넌트 정의
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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0px;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 50px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Label = styled.div`
  display: flex;
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 35px;
  color: black;
  justify-content: center;
`;

const LabelMini = styled.div`
  display: flex;
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  font-size: 20px;
  margin-bottom: 25px;
  color: black;
  text-align: center;
  justify-content: center;
`;

const FormContainerNew = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0px;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 50px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// 메인 컴포넌트
const MakeQuiz2: React.FC = () => {
  interface LocationState {
    tempQuizName?: string;
  }
  const navigate = useNavigate();
  const location = useLocation();
  // location.state가 undefined일 수 있으므로, LocationState 타입의 기본값을 제공합니다.
  const [pdfId, setPdfId] = useState<number>(location.state.pdfId);
  const [uploadFileName, setUploadFileName] = useState<string>(
    location.state.uploadFileName
  );
  const [endPageNumber, setEndPageNumber] = useState<number>(
    location.state.endPageNumber
  );
  const [startPageNumber, setStartPageNumber] = useState<number>(
    location.state.startPageNumber
  );
  const [selectedSubject, setSelectedSubject] = useState<string | null>(
    location.state.selectedSubject
  );

  const [problemType, setProblemType] = useState<string>(
    location.state.problemType
  );
  const [problemCount, setProblemCount] = useState<string>(
    location.state.problemCount
  );
  const [difficulty, setDifficulty] = useState<string>(
    location.state.difficulty
  );

  const [problemTypeKey, setProblemTypeKey] = useState<string>(
    location.state.problemTypeKey
  );
  const [difficultyKey, setDifficultyKey] = useState<string>(
    location.state.difficultyKey
  );

  const [apiSuccess, setApiSuccess] = useState<boolean>(false); // API 호출 성공 여부를 나타내는 상태 추가

  const [quiz, setQuiz] = useState<string>("");

  interface token {
    jwtToken: string; // JWT 토큰을 props로 받습니다.
  }
  const jwtToken = localStorage.getItem("authToken") || "";

  const handleQuizOptionSubmit = async () => {
    try {
      const response = await orderQuiz(
        jwtToken,
        pdfId,
        uploadFileName,
        selectedSubject,
        startPageNumber,
        endPageNumber,
        problemType,
        problemCount,
        difficulty
      );

      console.log(response);
      setApiSuccess(true);
      setQuiz(JSON.stringify(response));
    } catch (error) {
      console.error(error);
      setApiSuccess(false);
    }
  };

  const handleLetsGoToQuiz = () => {
    //const res = event.target.dataset.res;
    console.log(problemType);
    if (problemType === "OX") {
      navigate("/quizox", {
        state: { quiz },
      });
    } else if (problemType === "BLANK") {
      navigate("/quizblank", {
        state: { quiz },
      });
    } else {
      navigate("/quiz", {
        state: { quiz },
      });
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 비동기 함수 실행

    handleQuizOptionSubmit();
  }, []); // 빈 배열을 의존성 배열로 전달하여 컴포넌트가 처음 마운트 될 때만 실행되도록 함

  return (
    <CenteredContainer>
      <Header />
      {apiSuccess ? ( // apiSuccess 상태에 따라 조건부 렌더링
        <FormContainerNew>
          {/* FormContainerNew 내용 */}
          <img src="orange_logo.svg" alt="" width={"100px"} />
          <Label>Quiz</Label>
          <Label>{uploadFileName}</Label>
          <LabelMini>{selectedSubject}</LabelMini>
          <LabelMini>
            {problemTypeKey} {problemCount} 문제
          </LabelMini>
          <LabelMini>난이도 {difficultyKey}</LabelMini>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              m: 1,
              color: "white",
              background: "#FFC450",
              justifyContent: "center",
              borderRadius: "16px",
              ":hover": { background: "#FFC450", color: "white" },
            }}
            onClick={handleLetsGoToQuiz}
          >
            시작하기
          </Button>
        </FormContainerNew>
      ) : (
        <FormContainer>
          {/* FormContainer 내용 */}
          <img src="orange_logo.svg" alt="" width={"100px"} />
          <Label>Quiz</Label>
          <Label>{uploadFileName}</Label>
          <LabelMini>{selectedSubject}</LabelMini>
          <LabelMini>
            {problemTypeKey} {problemCount} 문제
          </LabelMini>
          <LabelMini>난이도 {difficultyKey}</LabelMini>

          <CircularProgress
            disableShrink
            sx={{
              color: (theme) =>
                theme.palette.mode === "light" ? "#f57f10" : "#f57f10",
              animationDuration: "1200ms",
            }}
            size={40}
            thickness={7}
          />
        </FormContainer>
      )}
    </CenteredContainer>
  );
};

export default MakeQuiz2;
