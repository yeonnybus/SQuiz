import React, { useEffect, useState } from "react";
import {
  TextField,
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f8df9d, #f7f0ba, #e2f3b4);
  font-family: "Pretendard Variable";
  flex-direction: column;
`;

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0px;
  width: 100%;
  max-width: 500px;
  background-color: white;
  padding: 50px;
  border-radius: 24px;
`;

const Row = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const RowQuiz = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 60px;
  gap: 0px;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const LabelSmall = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px;
`;

const StyledRow = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  margin: 20px 0;
  width: calc(100% - 40px);
  border-radius: 16px;
`;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  width: 100%;
  .MuiToggleButtonGroup-grouped {
    flex: 1;
  }
`;

const textFieldStyle = {
  input: {
    height: "40px",
  },
};

const innerElementStyle = {
  marginBottom: "16px",
};
const subjectStyle = {
  width: "200px",
};

const MakeQuiz: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pdfId, setPdfId] = useState<number>(location.state.pdfId);
  const [uploadFileName, setUploadFileName] = useState<string>(
    location.state.uploadedFileName + location.state.generateQuizNum
  );
  const [endPageNumber, setEndPageNumber] = useState<number>(
    location.state.totalPageCount
  );
  const [startPageNumber, setStartPageNumber] = useState<number>(1);
  const [subjects, setSubjects] = useState<{ label: string; value: string }[]>([
    { label: "운영체제", value: "OPERATING_SYSTEM" },
    { label: "컴퓨터통신", value: "COMPUTER_COMMUNICATION" },
    { label: "객체지향프로그래밍", value: "OBJECT_ORIENTED_PROGRAMMING" },
    { label: "C프로그래밍", value: "C_LANGUAGE" },
  ]);
  const [selectedSubject, setSelectedSubject] = useState<string>(
    location.state.selectedSubject
  );

  const [problemType, setProblemType] = useState<string>("");
  const [problemCount, setProblemCount] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");

  const [problemTypeKey, setProblemTypeKey] = useState<string | null>("");
  const [difficultyKey, setDifficultyKey] = useState<string | null>("");

  const [error, setError] = useState<string>("");

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    const key = event.currentTarget.getAttribute("data-key");
    setProblemType(newType);
    setProblemTypeKey(key);
  };

  const handleCountChange = (
    event: React.MouseEvent<HTMLElement>,
    newCount: string
  ) => {
    setProblemCount(newCount);
  };

  const handleDifficultyChange = (
    event: React.MouseEvent<HTMLElement>,
    newDifficulty: string
  ) => {
    const key = event.currentTarget.getAttribute("data-key");
    setDifficulty(newDifficulty);
    setDifficultyKey(key);
  };

  useEffect(() => {
    console.log(problemTypeKey);
    console.log(difficultyKey);
  }, [problemType, difficulty]);

  const handleQuizOptionSubmit = () => {
    navigate("/makequiz2", {
      state: {
        pdfId,
        uploadFileName,
        selectedSubject,
        startPageNumber,
        endPageNumber,
        problemType,
        problemCount,
        difficulty,
        problemTypeKey,
        difficultyKey,
      },
    });
  };

  const handlePageNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      if (value > location.state.totalPageCount) {
        setError(
          `끝 페이지 번호는 ${location.state.totalPageCount} 이하여야 합니다.`
        );
      } else {
        setError("");
        setEndPageNumber(value);
      }
    }
  };

  return (
    <CenteredContainer>
      <Header />
      <FormContainer>
        <RowQuiz>
          <Label>QUIZ</Label>
          <TextField
            variant="standard"
            value={uploadFileName}
            onChange={(e) => setUploadFileName(e.target.value)}
            InputProps={{ style: textFieldStyle.input }}
            sx={{ marginLeft: -5 }}
          />
        </RowQuiz>

        <StyledRow>
          <Row style={innerElementStyle}>
            <LabelSmall>문제 생성 페이지</LabelSmall>
            <TextField
              label="시작 페이지 번호"
              variant="standard"
              type="number"
              value={startPageNumber}
              onChange={(e) => {
                const value = Number(e.target.value);
                setStartPageNumber(!isNaN(value) ? value : 0);
              }}
              InputProps={{ style: textFieldStyle.input }}
            />
            <TextField
              label="끝 페이지 번호"
              variant="standard"
              type="number"
              value={endPageNumber}
              onChange={handlePageNumberChange}
              InputProps={{ style: textFieldStyle.input }}
            />
          </Row>

          <Row style={innerElementStyle}>
            <Label>문제 유형</Label>
            <StyledToggleButtonGroup
              value={problemType}
              exclusive
              onChange={handleTypeChange}
              aria-label="문제 유형"
              sx={{ borderRadius: "20px", backgroundColor: "white" }}
            >
              <ToggleButton
                value="BLANK"
                data-key="빈칸"
                selected={problemType === "BLANK"}
                sx={{
                  borderRadius: "20px",
                  "&.Mui-selected": { background: "#98E408", color: "white" },
                }}
              >
                빈칸
              </ToggleButton>
              <ToggleButton
                value="MULTIPLE_CHOICE"
                data-key="객관식"
                selected={problemType === "MULTIPLE_CHOICE"}
                sx={{
                  "&.Mui-selected": { background: "#98E408", color: "white" },
                }}
              >
                객관식
              </ToggleButton>
              <ToggleButton
                value="OX"
                data-key="O/X"
                selected={problemType === "OX"}
                sx={{
                  borderRadius: "20px",
                  "&.Mui-selected": { background: "#98E408", color: "white" },
                }}
              >
                OX
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Row>

          <Row style={innerElementStyle}>
            <Label>문제 개수</Label>
            <StyledToggleButtonGroup
              value={problemCount}
              exclusive
              onChange={handleCountChange}
              aria-label="문제 개수"
              sx={{ borderRadius: "20px", backgroundColor: "white" }}
            >
              <ToggleButton
                value={5}
                sx={{
                  borderRadius: "20px",
                  "&.Mui-selected": { background: "#98E408", color: "white" },
                }}
              >
                5
              </ToggleButton>
              <ToggleButton
                value={10}
                sx={{
                  "&.Mui-selected": { background: "#98E408", color: "white" },
                }}
              >
                10
              </ToggleButton>
              <ToggleButton
                value={15}
                sx={{
                  "&.Mui-selected": { background: "#98E408", color: "white" },
                }}
              >
                15
              </ToggleButton>
              <ToggleButton
                value={20}
                sx={{
                  borderRadius: "20px",
                  "&.Mui-selected": { background: "#98E408", color: "white" },
                }}
              >
                20
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Row>

          <Row>
            <Label>난이도</Label>
            <StyledToggleButtonGroup
              value={difficulty}
              key={difficultyKey}
              exclusive
              onChange={handleDifficultyChange}
              aria-label="난이도"
              sx={{ borderRadius: "20px", backgroundColor: "white" }}
            >
              <ToggleButton
                value="UPPER"
                data-key="상"
                selected={difficulty === "UPPER"}
                sx={{
                  borderRadius: "20px",
                  "&.Mui-selected": { background: "#98E408", color: "white" },
                }}
              >
                상
              </ToggleButton>
              <ToggleButton
                value="MIDDLE"
                data-key="중"
                selected={difficulty === "MIDDLE"}
                sx={{
                  "&.Mui-selected": { background: "#98E408", color: "white" },
                }}
              >
                중
              </ToggleButton>
              <ToggleButton
                value="LOWER"
                data-key="하"
                selected={difficulty === "LOWER"}
                sx={{
                  borderRadius: "20px",
                  "&.Mui-selected": { background: "#98E408", color: "white" },
                }}
              >
                하
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Row>
        </StyledRow>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            m: 1,
            color: "white",
            background: "gray",
            borderRadius: "16px",
            ":hover": { background: "#98E408", color: "white" },
          }}
          onClick={handleQuizOptionSubmit}
        >
          확인
        </Button>
      </FormContainer>
    </CenteredContainer>
  );
};

export default MakeQuiz;
