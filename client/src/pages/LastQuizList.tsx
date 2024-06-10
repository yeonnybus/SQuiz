import React, { useEffect, useState } from "react";
import QuizList from "../components/QuizList";
import styled from "styled-components";
import { TextField, Autocomplete } from "@mui/material";
import Header from "../components/Header";
import { loadLastQuizList } from "../api/axios";

const CenteredContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom right, #f8df9d, #f7f0ba, #e2f3b4);
  font-family: "Pretendard Variable";
  font-display: swap;
  src: local("Pretendard Variable"),
    url("./PretendardVariable.ttf") format("ttf");
  overflow-y: auto;
  overflow-x: hidden;
`;

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  padding-top: 50px;
  margin-bottom: 50px;
`;

const Label = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: black;
`;

const LabelMini = styled.div`
  font-size: 24px;
  margin-bottom: 50px;
  margin-right: 10%;
  width: 50%;
  color: black;
  white-space: nowrap; /* 줄바꿈 방지 */
`;

const LabelAcmp = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  color: gray;
`;

const Filter = styled.div`
  flex-direction: column;
`;

const subjectStyle = {
  width: "150px",
};

const InlineContainer = styled.div`
  display: flex;
  align-items: center;
  width: 85vw;
`;

const Horizon = styled.div`
  border-bottom: 2px solid #fffbe3;
  width: 83vw;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1%;
`;

export interface Quiz {
  quizId: number;
  quizName: string;
  subjectType: string;
  problemNum: number;
  correctNum: number;
  weakPart: string[];
  createdAt: string;
  uploadFileName: string;
}
export interface QuizListResponse {
  quizList: Quiz[];
}

const LastQuizList: React.FC = () => {
  const jwtToken = localStorage.getItem("authToken") || "";

  const [sortOptions] = useState<{ label: string; value: string }[]>([
    { label: "최신순", value: "최신순" },
    { label: "오래된순", value: "오래된순" },
  ]);
  const [selectedSort, setSelectedSort] = useState<string>("최신순");

  const [subjects] = useState<{ label: string; value: string }[]>([
    { label: "운영체제", value: "OPERATING_SYSTEM" },
    { label: "컴퓨터통신", value: "COMPUTER_COMMUNICATION" },
    { label: "객체지향프로그래밍", value: "OBJECT_ORIENTED_PROGRAMMING" },
    { label: "C프로그래밍", value: "C_LANGUAGE" },
  ]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [filteredQuizList, setFilteredQuizList] = useState<Quiz[]>([]);

  useEffect(() => {
    const handleLoadLastQuizList = async () => {
      try {
        const response = await loadLastQuizList(jwtToken);
        if (response) {
          const item = response.body.data.quizList;
          setQuizList(item);
        }
      } catch (error) {
        console.error("Error loading last quiz list:", error);
      }
    };

    handleLoadLastQuizList();
  }, [jwtToken]);

  useEffect(() => {
    let filtered = quizList;
    if (selectedSubject) {
      filtered = quizList.filter(
        (quiz) => quiz.subjectType === selectedSubject
      );
    }

    if (selectedSort) {
      filtered = filtered.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        if (selectedSort === "최신순") {
          return dateB - dateA;
        } else if (selectedSort === "오래된순") {
          return dateA - dateB;
        }
        return 0;
      });
    }

    setFilteredQuizList(filtered);
  }, [quizList, selectedSubject, selectedSort]);

  const handleSortChange = (
    event: any,
    newValue: { label: string; value: string } | null
  ) => {
    setSelectedSort(newValue?.value || "최신순");
  };

  const handleSubjectChange = (
    event: any,
    newValue: { label: string; value: string } | null
  ) => {
    setSelectedSubject(newValue?.value || null);
  };

  return (
    <CenteredContainer>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <FormContainer>
        <Label>지난 퀴즈 목록</Label>
        <InlineContainer>
          <LabelMini>생성된 퀴즈를 확인하세요</LabelMini>
          <Filter>
            <LabelAcmp>정렬 기준</LabelAcmp>
            <Autocomplete
              style={subjectStyle}
              options={sortOptions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      paddingTop: "3px",
                      borderRadius: "20px",
                    },
                  }}
                />
              )}
              sx={{
                "& .MuiInputBase-root": { height: "40px" },
                marginRight: "20px",
                marginBottom: "30px",
              }}
              value={
                sortOptions.find((option) => option.value === selectedSort) ||
                null
              }
              onChange={handleSortChange}
              defaultValue={sortOptions[0]}
            />
          </Filter>
          <Filter>
            <LabelAcmp>필터</LabelAcmp>
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
                      paddingTop: "3px",
                      borderRadius: "20px",
                    },
                  }}
                />
              )}
              sx={{
                "& .MuiInputBase-root": { height: "40px" },
                marginBottom: "30px",
              }}
              value={
                subjects.find((subject) => subject.value === selectedSubject) ||
                null
              }
              onChange={handleSubjectChange}
            />
          </Filter>
        </InlineContainer>
        <Horizon />
      </FormContainer>
      <QuizList quizList={filteredQuizList} token={jwtToken} />
    </CenteredContainer>
  );
};

export default LastQuizList;
