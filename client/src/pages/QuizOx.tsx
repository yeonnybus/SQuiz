import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  IconButton,
  Button,
  Modal,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { quizSubmit } from "../api/axios";
import Header from "../components/Header";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom right, #f8df9d, #f7f0ba, #e2f3b4);
  font-family: "Pretendard Variable";
  font-display: swap;
  src: local("Pretendard Variable"),
    url("./PretendardVariable.ttf") format("ttf");
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;

  margin: 100px;
  background-color: white;
  padding: 5%;

  border-radius: 24px;
`;

const LabelOption = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  min-width: 80px;
  font-size: 15px;
  margin-bottom: 25px;
  color: black;
  justify-content: center;
  border: ${(props) =>
    props.isSelected ? "2px solid black;" : "1px solid gray"};
  border-radius: 24px;
  height: 70px;
  cursor: pointer;
  box-sizing: border-box;
  padding: ${(props) =>
    props.isSelected
      ? "1px 1px"
      : "2px 2px"}; // Adjust padding to account for border thickness
  padding-left: 30px;
  padding-right: 30px;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 35px;
  margin-left: 35px;
  color: black;
  justify-content: start;
`;

const LabelMini = styled.div`
  display: flex;
  min-width: 80px;
  font-size: 13px;
  color: gray;
  justify-content: end;
`;

interface ProblemOptions {
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

interface Problem {
  problemNo: number;
  question: string;
  options: ProblemOptions;
  content: string | null;
}

interface QuizData {
  problemList: Problem[];
  problemNum: number;
  quizId: number;
  quizName: string;
  quizType: string;
}

interface ResponseBody {
  data: QuizData;
  msg: string;
  header: {
    resultCode: string;
    codeName: string;
  };
}

interface ApiResponse {
  data: {
    body: ResponseBody;
  };
  status: number;
  statusText: string;
  headers: {
    "cache-control": string;
    "content-type": string;
    expires: string;
    pragma: string;
  };
}
// axios.ts

export interface CheckedBlanks {
  chekedBlank_1: string | null;
  chekedBlank_2: string | null;
  chekedBlank_3: string | null;
  chekedBlank_4: string | null;
}

export interface ProblemForSubmit {
  problemNo: number;
  checkedAnswer: string;
  checkedBlanks: CheckedBlanks;
}

export interface QuizSubmission {
  quizId: number;
  problems: ProblemForSubmit[];
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#fffbe3",
};
const Inline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 2%;
`;

const generateQuizSubmission = (quizId: number, fullAnswer: string[]) => {
  return {
    quizId: quizId,
    problems: fullAnswer.map((answer, index) => ({
      problemNo: index + 1,
      checkedAnswer: answer,
      checkedBlanks: {
        chekedBlank_1: null,
        chekedBlank_2: null,
        chekedBlank_3: null,
        chekedBlank_4: null,
      },
    })),
  };
};

function QuizOx() {
  const jwtToken = localStorage.getItem("authToken") || "";
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [quizObject, setQuizObject] = useState<ApiResponse>(
    JSON.parse(location.state.quiz)
  );
  const problemList: number = quizObject.data.body.data.problemList.length;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [nowAnswer, setNowAnswer] = useState<string>("0");
  const [fullAnswer, setFullAnswer] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const quizId: number = quizObject.data.body.data.quizId;
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < problemList - 1) {
        fullAnswer.push(nowAnswer);
        setNowAnswer("0");
        setSelectedOption(null);
        console.log(fullAnswer);
        return prevIndex + 1;
      } else {
        alert("퀴즈가 끝났습니다!");
        return prevIndex; // 문제 리스트의 끝에 도달했을 경우, 인덱스를 업데이트하지 않습니다.
      }
    });
  };

  const handleBefore = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        setSelectedOption(null);

        fullAnswer.pop();
        console.log(fullAnswer);
        return prevIndex - 1;
      } else {
        alert("첫번째 문제입니다");
        return prevIndex; // 문제 리스트의 끝에 도달했을 경우, 인덱스를 업데이트하지 않습니다.
      }
    });
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setNowAnswer(option);
  };

  const handleSubmit = () => {
    if (fullAnswer.includes("0")) {
      setModalMessage("정답을 체크하지 않은 문제가 있어요! 이대로 제출할까요?");
      setIsModalOpen(true);
    } else {
      setModalMessage("퀴즈를 제출할까요?");
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmSubmit = async () => {
    setLoading(true);
    if (
      currentIndex === problemList - 1 &&
      fullAnswer.length < currentIndex + 1
    ) {
      fullAnswer.push(nowAnswer);
    }
    const submission: QuizSubmission = generateQuizSubmission(
      quizId,
      fullAnswer
    );
    console.log("Quiz Submission JSON:", submission);
    try {
      const response = await quizSubmit(jwtToken, submission);

      const resultData = response.body.data;
      const stringData = JSON.stringify(resultData);
      console.log(stringData);
      setResult(stringData);
      console.log(result);
      navigate("/quizresult", {
        state: { stringData },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <CenteredContainer>
      <Header />
      <FormContainer>
        <Label>{`Q${
          currentIndex + 1
        }.\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${
          quizObject.data.body.data.problemList[currentIndex].question
        }`}</Label>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            padding: "10px",
            paddingLeft: "1vw",
            paddingRight: "1vw",
            marginBottom: "5vw",
          }}
        >
          <Grid item xs={6}>
            <LabelOption
              isSelected={selectedOption === "o"}
              onClick={() => handleOptionClick("o")}
            >{`O`}</LabelOption>
          </Grid>
          <Grid item xs={6}>
            <LabelOption
              isSelected={selectedOption === "x"}
              onClick={() => handleOptionClick("x")}
            >{`X`}</LabelOption>
          </Grid>
        </Grid>
        <IconButton
          aria-label="backward"
          size="small"
          sx={{
            color: "gray",
            position: "absolute",
            left: "30px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={handleBefore}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>
        <IconButton
          aria-label="forward"
          size="small"
          sx={{
            color: "gray",
            position: "absolute",
            right: "30px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={handleNext}
        >
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
        <LabelMini>{`${problemList} 문제 중 ${
          currentIndex + 1
        } 번째 문제`}</LabelMini>
        {currentIndex === problemList - 1 && (
          <Button
            variant="contained"
            size="large"
            sx={{
              width: "20%",
              color: "white",
              background: "gray",
              borderRadius: "16px",
              marginLeft: "40%",
              ":hover": { background: "#ffc450", color: "black" },
            }}
            onClick={handleSubmit}
          >
            제출하기
          </Button>
        )}
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box sx={modalStyle}>
            <ReportProblemIcon sx={{ color: "orange" }} />
            <Typography sx={{ mt: 2 }}>{modalMessage}</Typography>
            <Inline>
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: "35%",
                  color: "white",
                  background: "#d9d9d9",
                  ":hover": { background: "#ffc450", color: "black" },
                  borderRadius: "16px",
                  margin: "2%",
                }}
                onClick={handleCloseModal}
                disabled={loading}
              >
                다시풀어보기
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: "30%",
                  color: "white",
                  background: "#d9d9d9",
                  ":hover": { background: "#ffc450", color: "black" },
                  borderRadius: "16px",
                  margin: "2%",
                }}
                onClick={handleConfirmSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "제출하기"}
              </Button>
            </Inline>
          </Box>
        </Modal>
      </FormContainer>
    </CenteredContainer>
  );
}

export default QuizOx;
