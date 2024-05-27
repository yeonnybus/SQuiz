import React, { useEffect, useState } from "react";
import Fruit from "../components/Fruit";
import styled from "styled-components";
import { TextField, Autocomplete, IconButton } from "@mui/material";
import QuizList from "../components/QuizList";
//import { FilterToggle, SortToggle, ItemDisplay } from "./components"; // 컴포넌트 경로에 맞게 조정하세요.

const CenteredContainer = styled.div`
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

  width: 100vh;

  padding-left: 50px;
  padding-top: 20px;
  margin-bottom: 40px;
`;

const Label = styled.div`
  font-size: 30px;
  font-weight: bold;

  color: black;
`;
const LabelMini = styled.div`
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-right: 450px;
  color: black;
  min-width: 400px;
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
  width: "150px", // 마지막 요소를 제외한 하단 마진 추가
};

const InlineContainer = styled.div`
  display: flex;
  width: 80vw;
  align-items: center;
`;

const Horizon = styled.div`
  border-bottom: 2px solid #fffbe3;
  width: 93vw;
`;

const LastQuizList: React.FC = () => {
  interface Item {
    fruitBasketId: number;
    fruitBasketName: string;
    subject: string;
    problemNum: number;
    createdAt: string; // ISO 날짜 형식을 가정합니다.
    updatedAt: string;
  }

  const items: Item[] = [
    {
      fruitBasketId: 1,
      fruitBasketName: "운체 중간 오답 바구니1",
      subject: "OPERATING_SYSTEM",
      problemNum: 20,
      createdAt: "2022-12-15T09:00:00",
      updatedAt: "2022-12-15T09:00:00",
    },
    {
      fruitBasketId: 1,
      fruitBasketName: "운체 중간 오답 바구니2",
      subject: "OPERATING_SYSTEM",
      problemNum: 10,
      createdAt: "2022-12-15T09:00:00",
      updatedAt: "2022-12-15T09:00:00",
    },
    {
      fruitBasketId: 1,
      fruitBasketName: "운체 중간 오답 바구니3",
      subject: "OPERATING_SYSTEM",
      problemNum: 15,
      createdAt: "2022-12-15T09:00:00",
      updatedAt: "2022-12-15T09:00:00",
    },
    {
      fruitBasketId: 1,
      fruitBasketName: "운체 중간 오답 바구니4",
      subject: "OPERATING_SYSTEM",
      problemNum: 10,
      createdAt: "2022-12-15T09:00:00",
      updatedAt: "2022-12-15T09:00:00",
    },
    {
      fruitBasketId: 1,
      fruitBasketName: "운체 중간 오답 바구니5",
      subject: "OPERATING_SYSTEM",
      problemNum: 5,
      createdAt: "2022-12-15T09:00:00",
      updatedAt: "2022-12-15T09:00:00",
    },

    // ... 추가 데이터 아이템들
  ];

  const [sort, setSort] = useState<{ label: string; value: string }[]>([
    { label: "최신순", value: "최신순" },
    { label: "시간순", value: "시간순" },
  ]);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const [subjects, setSubjects] = useState<{ label: string; value: string }[]>([
    { label: "운영체제", value: "운영체제" },
    { label: "컴퓨터통신", value: "컴퓨터통신" },
    { label: "객체지향프로그래밍", value: "객체지향프로그래밍" },
    { label: "C프로그래밍", value: "C프로그래밍" },
  ]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    // 서버로부터 데이터를 가져오는 함수를 여기에 구현하세요.
  }, []);

  // 필터링 및 정렬 로직을 여기에 구현하세요.

  return (
    <CenteredContainer>
      <FormContainer>
        <Label>지난 퀴즈 목록</Label>
        <InlineContainer>
          <LabelMini>생성된 퀴즈를 확인하세요</LabelMini>
          <Filter>
            <LabelAcmp>정렬 기준</LabelAcmp>
            <Autocomplete
              style={subjectStyle}
              options={sort}
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
                marginRight: "20px",
                marginBottom: "30px",
              }}
              value={
                sort.find((subject) => subject.value === selectedSort) || null
              }
              onChange={(
                event: any,
                newValue: { label: string; value: string } | null
              ) => setSelectedSort(newValue?.value || null)}
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
                      paddingTop: "3px", // 수직 정렬을 위해 상단 패딩 조정
                      // 필요하다면 여기에 verticalAlign: 'middle' 같은 스타일도 추가할 수 있습니다.
                      borderRadius: "20px",
                      width: "15vw",
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
              onChange={(
                event: any,
                newValue: { label: string; value: string } | null
              ) => setSelectedSubject(newValue?.value || null)}
            />
          </Filter>
        </InlineContainer>
        <Horizon />
      </FormContainer>
      <QuizList items={items} />
    </CenteredContainer>
  );
};

export default LastQuizList;
