import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import styled from "styled-components";

// 스타일드 컴포넌트 정의
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f8df9d, #f7f0ba, #e2f3b4);
  font-family: "Nanum Gothic", sans-serif;
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
  align-items: center; /* 모든 자식 요소들을 수직 방향으로 가운데 정렬 */
  margin-bottom: 10px;
`;

const RowQuiz = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* 모든 자식 요소들을 수직 방향으로 가운데 정렬 */
  margin-bottom: 10px;
  margin-right: 60px;
  gap: 0px;
`;

const Label = styled.div`
  display: flex;
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  font-weight: bold;
  margin-bottom: 10px;
`;

const LabelSmall = styled.div`
  display: flex;
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px;
`;

// Row 컨테이너에 대한 스타일 조정
const StyledRow = styled.div`
  background-color: #f0f0f0; // 배경색을 회색으로 설정
  padding: 20px; // 내부 여백 추가
  margin: 20px 0; // 상하 여백 추가
  width: calc(100% - 40px); // FormContainer보다 조금 작은 가로 길이 설정
  border-radius: 16px;
`;

// ToggleButtonGroup 스타일 커스터마이징
const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  width: 100%; // 가로 길이를 부모 요소의 100%로 설정
  .MuiToggleButtonGroup-grouped {
    // ToggleButtonGroup 내부 버튼 스타일 조정
    flex: 1; // 버튼이 가능한 공간을 모두 차지하도록 설정
  }
`;

// TextField 세로길이 조절을 위한 스타일
const textFieldStyle = {
  input: {
    height: "40px", // input 요소의 높이 조절
  },
};

const innerElementStyle = {
  marginBottom: "16px", // 마지막 요소를 제외한 하단 마진 추가
};
const subjectStyle = {
  width: "200px", // 마지막 요소를 제외한 하단 마진 추가
};

// 메인 컴포넌트
const MakeQuiz: React.FC = () => {
  const [uploadFileName, setUploadFileName] = useState<string>("");
  const [endPageNumber, setEndPageNumber] = useState<string>("1");
  const [startPageNumber, setStartPageNumber] = useState<string>("1");
  const [subjects, setSubjects] = useState<{ label: string; value: string }[]>([
    { label: "운영체제", value: "os" },
    { label: "컴퓨터통신", value: "network" },
    { label: "객체지향", value: "java" },
    { label: "C프로그래밍", value: "lanc" },
  ]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const [problemType, setProblemType] = useState<string>("");
  const [problemCount, setProblemCount] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    setProblemType(newType);
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
    setDifficulty(newDifficulty);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/your-endpoint", {
        uploadFileName,
        endPageNumber,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CenteredContainer>
      <FormContainer>
        <RowQuiz>
          <Label>QUIZ</Label>
          <TextField
            variant="standard"
            value={uploadFileName}
            onChange={(e) => setUploadFileName(e.target.value)}
            InputProps={{ style: textFieldStyle.input }} // 세로 길이 조절 적용
            sx={{ marginLeft: -5 }}
          />
        </RowQuiz>

        <Label>과목</Label>

        <Autocomplete
          style={subjectStyle}
          options={subjects}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: {
                  paddingTop: "3px", // 수직 정렬을 위해 상단 패딩 조정
                  // 필요하다면 여기에 verticalAlign: 'middle' 같은 스타일도 추가할 수 있습니다.
                  borderRadius: "20px",
                },
              }}
            />
          )}
          sx={{
            "& .MuiInputBase-root": { height: "40px" },
          }}
          value={
            subjects.find((subject) => subject.value === selectedSubject) ||
            null
          }
          onChange={(
            event: any,
            newValue: { label: string; value: string } | null
          ) => setSelectedSubject(newValue?.value || null)}
        />

        <StyledRow>
          <Row style={innerElementStyle}>
            <LabelSmall>문제 생성 페이지</LabelSmall>
            <TextField
              label="시작 페이지 번호"
              variant="standard"
              type="number"
              value={startPageNumber}
              onChange={(e) => setStartPageNumber(e.target.value)}
              InputProps={{ style: textFieldStyle.input }} // 세로 길이 조절 적용
            />
            <TextField
              label="끝 페이지 번호"
              variant="standard"
              type="number"
              value={endPageNumber}
              onChange={(e) => setEndPageNumber(e.target.value)}
              InputProps={{ style: textFieldStyle.input }} // 세로 길이 조절 적용
            />
          </Row>
          {/* 이하 내용은 이전과 동일 */}
          {/* 문제 유형 선택 */}
          <Row style={innerElementStyle}>
            <Label>문제 유형</Label>
            <StyledToggleButtonGroup
              value={problemType}
              exclusive
              onChange={handleTypeChange}
              aria-label="문제 유형"
              sx={{ borderRadius: "20px", backgroundColor: "white" }}
            >
              <ToggleButton value="빈칸" sx={{ borderRadius: "20px" }}>
                빈칸
              </ToggleButton>
              <ToggleButton value="객관식">객관식</ToggleButton>
              <ToggleButton value="OX" sx={{ borderRadius: "20px" }}>
                OX
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Row>

          {/* 문제 개수 선택 */}
          <Row style={innerElementStyle}>
            <Label>문제 개수</Label>
            <StyledToggleButtonGroup
              value={problemCount}
              exclusive
              onChange={handleCountChange}
              aria-label="문제 개수"
              sx={{ borderRadius: "20px", backgroundColor: "white" }}
            >
              <ToggleButton value={5} sx={{ borderRadius: "20px" }}>
                5
              </ToggleButton>
              <ToggleButton value={10}>10</ToggleButton>
              <ToggleButton value={15}>15</ToggleButton>
              <ToggleButton value={20} sx={{ borderRadius: "20px" }}>
                20
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Row>

          {/* 난이도 선택 */}
          <Row>
            <Label>난이도</Label>
            <StyledToggleButtonGroup
              value={difficulty}
              exclusive
              onChange={handleDifficultyChange}
              aria-label="난이도"
              sx={{ borderRadius: "20px", backgroundColor: "white" }}
            >
              <ToggleButton value="상" sx={{ borderRadius: "20px" }}>
                상
              </ToggleButton>
              <ToggleButton value="중">중</ToggleButton>
              <ToggleButton value="하" sx={{ borderRadius: "20px" }}>
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
        >
          확인
        </Button>
      </FormContainer>
    </CenteredContainer>
  );
};

export default MakeQuiz;
