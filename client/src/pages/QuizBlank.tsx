import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
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
  overflow-y: auto;
  overflow-x: hidden;
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

interface Problem {
  problemNo: number;
  question: string;
  options: {};
  content: string | null;
  blankNum: number;
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

const generateQuizSubmission = (
  quizId: number,
  checkedBlanks: CheckedBlanks[]
): QuizSubmission => {
  return {
    quizId: quizId,
    problems: checkedBlanks.map((blanks, index) => ({
      problemNo: index + 1,
      checkedAnswer: "",
      checkedBlanks: {
        chekedBlank_1: blanks.chekedBlank_1 || null,
        chekedBlank_2: blanks.chekedBlank_2 || null,
        chekedBlank_3: blanks.chekedBlank_3 || null,
        chekedBlank_4: blanks.chekedBlank_4 || null,
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
  const [checkedBlanks, setCheckedBlanks] = useState<CheckedBlanks[]>(
    Array(problemList).fill({
      chekedBlank_1: null,
      chekedBlank_2: null,
      chekedBlank_3: null,
      chekedBlank_4: null,
    })
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const quizId: number = quizObject.data.body.data.quizId;
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < problemList - 1) {
        return prevIndex + 1;
      } else {
        alert("퀴즈가 끝났습니다!");
        return prevIndex;
      }
    });
  };

  const handleBefore = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        alert("첫번째 문제입니다");
        return prevIndex;
      }
    });
  };

  const handleBlankChange = (
    problemIndex: number,
    blankIndex: number,
    value: string
  ) => {
    const updatedBlanks = [...checkedBlanks];
    const key = `chekedBlank_${blankIndex + 1}` as keyof CheckedBlanks;
    updatedBlanks[problemIndex] = {
      ...updatedBlanks[problemIndex],
      [key]: value || null,
    };
    setCheckedBlanks(updatedBlanks);
  };

  const handleSubmit = () => {
    setModalMessage("퀴즈를 제출할까요?");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmSubmit = async () => {
    setLoading(true);
    const submission: QuizSubmission = generateQuizSubmission(
      quizId,
      checkedBlanks
    );
    console.log("Quiz Submission JSON:", submission);
    try {
      const response = await quizSubmit(jwtToken, submission);

      const resultData = response.body.data;
      const stringData = JSON.stringify(resultData);
      console.log(stringData);
      setResult(stringData);
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

  const currentProblem = quizObject.data.body.data.problemList[currentIndex];

  return (
    <CenteredContainer>
      <Header />
      <FormContainer>
        <Label>{`Q${
          currentIndex + 1
        }.\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${
          currentProblem.question
        }`}</Label>
        {currentProblem.content?.startsWith("<markdown>") ? (
          <ReactMarkdown>
            {currentProblem.content?.replace("<markdown>", "")}
          </ReactMarkdown>
        ) : (
          <Label>{`${currentProblem.content || ""}`}</Label>
        )}

        {Array(currentProblem.blankNum)
          .fill(null)
          .map((_, i) => (
            <TextField
              key={i}
              label={`빈칸 ${i + 1}`}
              value={
                checkedBlanks[currentIndex][
                  `chekedBlank_${i + 1}` as keyof CheckedBlanks
                ] || ""
              }
              onChange={(e) =>
                handleBlankChange(currentIndex, i, e.target.value)
              }
              margin="none"
              variant="standard"
              sx={{
                display: "block",
                margin: "0 auto",
                "& .MuiInputLabel-root": {
                  color: "#FE9F2C",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FE9F2C",
                },
              }}
            />
          ))}
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
