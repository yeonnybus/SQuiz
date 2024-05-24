import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, IconButton, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
  gap: 20px;
  width: 100vh;
  margin: 100px;
  background-color: white;
  padding: 50px;
  padding-left: 15%;
  padding-right: 15%;
  border-radius: 24px;
`;

const Label = styled.div`
  display: flex;
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  min-width: 100px; /* 필요하다면 최소 너비 지정 */
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 35px;
  margin-left: 35px;
  color: black;
  justify-content: start;
`;

const LabelMini = styled.div`
  display: flex;
  align-items: center; /* 텍스트를 수직 방향으로 가운데 정렬 */
  min-width: 80px; /* 필요하다면 최소 너비 지정 */
  font-size: 15px;
  margin-bottom: 25px;
  color: black;
  justify-content: start;
  border: 1px solid;
  border-color: #d9d9d9;
  border-radius: 24px;
  height: 70px;
  padding-left: 30px;
`;
const Ans = styled.div`
  :focus {
    border: 2px solid black;
  }
`;

interface QuizResponse {
  data: Data;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: any;
}

interface Data {
  header: Header;
  body: Body;
}

interface Header {
  resultCode: string;
  codeName: string;
}

interface Body {
  data: QuizData;
  msg: string;
}

interface QuizData {
  quizId: number;
  quizType: string;
  problemList: Problem[];
}

interface Problem {
  id: number;
  kc: string;
  question: string;
  choice: Choice;
  content: null;
  answers: Answer[];
}

interface Choice {
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

interface Answer {
  id: number;
  answer: string;
}

interface Headers {
  "cache-control": string;
  "content-type": string;
  expires: string;
  pragma: string;
}

interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: any;
  headers: ConfigHeaders;
  method: string;
  url: string;
  data: string;
}

interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

interface ConfigHeaders {
  Accept: string;
  "Content-Type": string;
  Authorization: string;
}

function Quiz() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const location = useLocation();

  const [quizObject, setQuizObject] = useState<QuizResponse>(
    JSON.parse(location.state.quiz)
  );
  const problemList: number = quizObject.data.body.data.problemList.length;

  const [nowAnswer, setNowAnswer] = useState<string>("0");
  const [fullAnswer, setFullAnswer] = useState<string[]>([]);
  const [isFinal, setIsFinal] = useState<boolean>(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < problemList - 1) {
        fullAnswer.push(nowAnswer);
        setNowAnswer("0");
        setIsFinal(true);
        console.log(fullAnswer);
        return prevIndex + 1;
      } else {
        alert("퀴즈가 끝났습니다!");
        return prevIndex; // 문제 리스트의 끝에 도달했을 경우, 인덱스를 업데이트하지 않습니다.
      }
    });
  };

  // 1. state 만들고, handleNext 클릭시 배열에 추가 및 state 초기화
  // 2. state 기본 상태는 0
  // 3. 마지막 문제일 때 제출하기 버튼 활성화 여기까지 완료
  // 4. 기본 json 설정
  // 5. 누르면 for문으로 json으로 만들고 전송
  // 6. 클릭시 테두리

  return (
    <CenteredContainer>
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
            padding: "60px",
          }}
        >
          <Grid item xs={6}>
            <Ans
              onClick={() => {
                setNowAnswer("a");
              }}
            >
              <LabelMini>
                {`(a)\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${quizObject.data.body.data.problemList[currentIndex].choice.option_a}`}
              </LabelMini>
            </Ans>
          </Grid>
          <Grid item xs={6}>
            <Ans
              onClick={() => {
                setNowAnswer("b");
              }}
            >
              <LabelMini>
                {`(b)\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${quizObject.data.body.data.problemList[currentIndex].choice.option_b}`}
              </LabelMini>
            </Ans>
          </Grid>
          <Grid item xs={6}>
            <Ans
              onClick={() => {
                setNowAnswer("c");
              }}
            >
              <LabelMini>
                {`(c)\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${quizObject.data.body.data.problemList[currentIndex].choice.option_c}`}
              </LabelMini>
            </Ans>
          </Grid>
          <Grid item xs={6}>
            <Ans
              onClick={() => {
                setNowAnswer("d");
              }}
            >
              <LabelMini>
                {`(d)\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${quizObject.data.body.data.problemList[currentIndex].choice.option_d}`}
              </LabelMini>
            </Ans>
          </Grid>
        </Grid>
        {/*<button onClick={handleNext}>다음문제버튼</button>*/}
        <IconButton
          aria-label="forward"
          size="small"
          sx={{
            marginTop: "30px",
            marginLeft: "600px",

            color: "gray",
            marginBottom: "20px",
          }}
          onClick={handleNext}
        >
          <ArrowForwardIcon />
        </IconButton>
        {isFinal} &&(
        <Button
          variant="contained"
          size="large"
          sx={{
            color: "white",
            background: "#ffc450",
            borderRadius: "16px",
            width: "25vh",
            marginTop: "20vh",
          }}
        >
          확인
        </Button>
        )
      </FormContainer>
    </CenteredContainer>
  );
}

export default Quiz;
