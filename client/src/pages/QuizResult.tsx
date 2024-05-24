import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

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
`;
const InCol = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  width: 80vw;
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
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  font-size: 25px;
  font-weight: bold;

  color: black;
`;

const LabelMini = styled.div`
  display: flex;
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  font-size: 20px;

  color: black;
  text-align: center;
  justify-content: center;
`;

const LabelMini2 = styled.div`
  display: flex;
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  font-size: 20px;

  color: black;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const LabelMini3 = styled.div`
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  font-size: 20px;

  color: black;
  text-align: center;
`;

const Label2 = styled.div`
  display: flex;

  min-width: 100px; /* 필요하다면 최소 너비 지정 */
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

  /* 필요하다면 최소 너비 지정 */
  font-size: 3em;
  font-weight: bold;
  color: gray;
`;

function QuizResult() {
  const [onResult, setonResult] = useState<boolean>(false);
  const [count, setCount] = useState(5);
  const [data, setData] = useState<{ id: number; value: number }[]>([]); // 데이터 상태 초기화

  useEffect(() => {
    // 서버로부터 데이터를 받아오는 함수
    const fetchData = async () => {
      // API 호출 로직을 여기에 구현
      // 예시 데이터
      const serverData = [
        { id: 1, value: 50 },
        { id: 2, value: 40 },
        { id: 3, value: 80 },
      ];
      setData(serverData); // 상태 업데이트
    };

    fetchData(); // 함수 실행
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실

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
          >
            결과 보기
          </Button>
        </FormContainer>
      ) : (
        <FormContainer2>
          <InlineS>
            <Label2>Quiz</Label2>
            <Label2>운영체제21222강</Label2>
          </InlineS>
          <LabelMini>점수</LabelMini>
          <InlineS2>
            <BigNum>2</BigNum>
            <SmallNum>/1</SmallNum>
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
            {data.map((item) => (
              <React.Fragment key={item.id}>
                <InCol>
                  <Gauge
                    key={item.id}
                    width={150}
                    height={150}
                    value={item.value}
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
                  <LabelMini3>{item.id}</LabelMini3>
                </InCol>
              </React.Fragment>
            ))}
          </InlineS>
        </FormContainer2>
      )}
    </CenteredContainer>
  );
}

export default QuizResult;
