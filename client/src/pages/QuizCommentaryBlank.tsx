import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  TextField,
  Autocomplete,
  Grid,
  IconButton,
  Button,
  createFilterOptions,
} from "@mui/material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { addProblem, makeBasket } from "../api/axios";
import { loadFruitBasket } from "../api/axios";
import { useNavigate } from "react-router-dom";
// 스타일 정의
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f8df9d, #f7f0ba, #e2f3b4);
  font-family: "Pretendard Variable";
  font-display: swap;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70vw;
  margin: 3vh;
  background-color: white;
  padding: 10px;
  border-radius: 24px;
  position: relative; /* 상대적으로 배치 */
`;

const FormContainerNew = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 1vh;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 50px;
  border-radius: 24px;
  align-items: center;
  text-align: center;
`;

const Inline = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inline2 = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

const LabelBig = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
  font-size: 30px;
  font-weight: bold;
  color: black;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-left: 35px;
  color: black;
  justify-content: start;
`;

// 선택지 라벨 스타일
const getBorderStyle = (isAnswer: boolean, isChecked: boolean) => css`
  border: ${isAnswer && isChecked
    ? "2px solid green"
    : isAnswer
    ? "2px solid green"
    : isChecked
    ? "2px solid red"
    : "1px solid #d9d9d9"};
`;

const LabelOption = styled.div<LabelProps>`
  display: flex;
  align-items: center;
  min-width: 80px;
  font-size: 15px;
  margin-bottom: 25px;
  color: black;
  justify-content: start;
  ${(props) => getBorderStyle(props.isAnswer, props.isChecked)}
  border-radius: 24px;
  height: 70px;
  padding-left: 30px;
`;

const LabelMini2 = styled.div`
  display: flex;
  align-items: center;
  min-width: 80px;
  font-size: 13px;
  color: gray;
  justify-content: start;
  padding-left: 94px;
  padding-top: 2%;
`;

const LabelModal = styled.div`
  display: flex;
  align-items: center;
  min-width: 80px;
  font-size: 18px;
  margin-bottom: 3%;
  color: gray;
`;

const LabelQuestion = styled.div`
  display: flex;
  min-width: 80px;
  font-size: 17px;
  margin-left: 3%;

  color: black;
  justify-content: start;
`;

const LabelQuestion2 = styled.div`
  display: flex;
  min-width: 80px;
  font-size: 17px;
  margin-left: 50px;

  color: black;
  justify-content: start;
`;

const style = {
  position: "absolute" as "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f7f7f7",
  boxShadow: 24,
  p: 10,
  borderRadius: "24px",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const VerticalLine = styled.div`
  border-bottom: 1px solid gray; /* 세로선 */
  width: 90%;
  margin-left: 3.5vw;
`;

const LabelSolution = styled.div`
  font-size: 16px;
  margin-left: 6%;
  color: gray;
  max-width: 90%;
  text-align: start;
  padding-bottom: 2%;
`;

// 타입 정의
interface ProblemOptions {
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

interface Blanks {
  blank_1: string;
  blank_2: string;
  blank_3: string;
  blank_4: string;
}

interface Problem {
  problemNo: number;
  quizType: string;
  question: string;
  options: ProblemOptions;
  content: string | null;
  answer: string;
  checkedAnswer: string;
  blanks: Blanks;
  checkedBlanks: CheckedBlanks;
  isCorrect: number;
  explanation: string;
  kcName: string;
}

interface QuizData {
  quizId: number;
  quizType: string;
  quizName: string;
  problemNum: number;
  subjectType: string;
  problemList: Problem[];
}

interface QuizCollectionOptionType {
  inputValue?: string;
  name: string;
  fruitBasketId?: number;
}
interface LabelProps {
  isAnswer: boolean;
  isChecked: boolean;
}

interface FruitBasket {
  fruitBasketId: number;
  fruitBasketName: string;
  subject: string;
  problemNum: number;
  createdAt: string;
  updatedAt: string;
}

interface FruitBasketsResponse {
  fruitBaskets: FruitBasket[];
}

export interface CheckedBlanks {
  chekedBlank_1: string | null;
  chekedBlank_2: string | null;
  chekedBlank_3: string | null;
  chekedBlank_4: string | null;
}

const filter = createFilterOptions<QuizCollectionOptionType>();

function QuizCommentaryBlank() {
  // 프론트단 관리 state
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 현재 인덱스
  const location = useLocation();
  const jwtToken = localStorage.getItem("authToken") || "";
  const [resultObject, setResultObject] = useState<QuizData>(
    JSON.parse(location.state.detailResuslt)
  );
  const [fruitBaskets, setFruitBaskets] = useState<FruitBasketsResponse>({
    fruitBaskets: [],
  });

  const navigate = useNavigate();

  // 서버에서 넘어올건데 임시 state
  const problemNum: number = resultObject.problemNum; // 문제 수
  const quizName: string = resultObject.quizName; // 퀴즈이름
  const isCorrect: number = resultObject.problemList[currentIndex].isCorrect; // 정오답(아이콘분류)

  // 더미 데이터 state로 관리
  const [quizCollections, setQuizCollections] = useState<
    readonly QuizCollectionOptionType[]
  >([]);

  const [value, setValue] = useState<QuizCollectionOptionType | null>(null); // autocomplete에서 지정된 값
  const [newBasket, setNewBasket] = useState<FruitBasket>();

  const [modOpen, setModOpen] = useState(false); // 모달 열렸는지
  const handleOpen = () => setModOpen(true);
  const handleClose = () => setModOpen(false);

  // 다음 문제로 이동
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < problemNum - 1) {
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
        return prevIndex - 1;
      } else {
        alert("첫번째 문제입니다");
        return prevIndex; // 문제 리스트의 끝에 도달했을 경우, 인덱스를 업데이트하지 않습니다.
      }
    });
  };

  //과일바구니목록가져오기
  //모달용
  useEffect(() => {
    // 서버로부터 데이터를 가져오는 함수를 여기에 구현하세요.
    const handleLoadFruitBasket = async () => {
      try {
        const response = await loadFruitBasket(jwtToken);
        if (response) {
          const item = response.fruitBaskets;
          console.log(item);
          setFruitBaskets({ fruitBaskets: item }); // item을 상태로 설정

          if (Array.isArray(item)) {
            const collections = item.map((basket: FruitBasket) => ({
              name: basket.fruitBasketName,
              fruitBasketId: basket.fruitBasketId,
            }));
            setQuizCollections(collections);
          } else {
            setQuizCollections([]); // item이 배열이 아닌 경우 빈 배열 설정
          }
        }
      } catch (error) {
        console.error("Error loading fruit basket:", error);
      }
    };

    handleLoadFruitBasket();
  }, [jwtToken]);

  const handleAddQuiz = async () => {
    if (!newBasket || !newBasket.fruitBasketId) {
      console.error("Fruit basket ID is not available.");
      return;
    }

    try {
      const response = await addProblem(
        jwtToken,
        newBasket.fruitBasketId,
        resultObject.problemList[currentIndex].problemNo,
        resultObject.quizType
      );
      console.log("Quiz added to the fruit basket:", response);
    } catch (error) {
      console.error("Error adding quiz to the fruit basket:", error);
    }
  };

  const handleAddNewValue = async (newValue: string) => {
    const newQuizCollection = { name: newValue };
    try {
      const basket = await makeBasket(
        jwtToken,
        newQuizCollection.name,
        resultObject.subjectType
      ); // 서버에 새로운 값을 POST
      setQuizCollections((prev) => [...prev, newQuizCollection]);
      setValue(newQuizCollection);
      console.log(basket);
      setNewBasket(basket.body.data.newFruitBasket);
    } catch (error) {
      console.error("Error adding new fruit basket:", error);
    }
  };

  return (
    <CenteredContainer>
      <FormContainerNew>
        <Inline>
          <IconButton
            aria-label="backward"
            size="small"
            sx={{
              color: "gray",
            }}
            onClick={() => {
              navigate(-1); // 뒤로 가기
            }}
          >
            <ArrowBackIosNewOutlinedIcon />
          </IconButton>
          <LabelBig>QUIZ : {quizName}</LabelBig>
        </Inline>
        <FormContainer>
          <LabelMini2>
            {resultObject.problemList[currentIndex].kcName}
          </LabelMini2>
          <Inline2>
            {isCorrect ? (
              <CircleOutlinedIcon
                sx={{
                  fontSize: "55px",
                  position: "absolute",
                  marginTop: "-15px",
                  marginLeft: "24px",
                  color: "red",
                }}
              />
            ) : (
              <CheckOutlinedIcon
                sx={{
                  fontSize: "50px",
                  position: "absolute",
                  marginTop: "-22px",
                  marginLeft: "22px",
                  color: "red",
                }}
              />
            )}
            <Label>{`Q${currentIndex + 1}.`}</Label>
            <LabelQuestion>
              {resultObject.problemList[currentIndex].question}
            </LabelQuestion>
          </Inline2>
          {resultObject.problemList[currentIndex].content?.startsWith(
            "<markdown>"
          ) ? (
            <ReactMarkdown>
              {resultObject.problemList[currentIndex].content?.replace(
                "<markdown>",
                ""
              )}
            </ReactMarkdown>
          ) : (
            <LabelQuestion>{`${
              resultObject.problemList[currentIndex].content || ""
            }`}</LabelQuestion>
          )}
          <React.Fragment>
            <StarOutlineOutlinedIcon
              sx={{
                marginLeft: "4%",
              }}
              onClick={handleOpen}
            />
            <Modal
              open={modOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <LabelModal>추가할 과일바구니 선택</LabelModal>
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      handleAddNewValue(newValue);
                    } else if (newValue && newValue.inputValue) {
                      handleAddNewValue(newValue.inputValue);
                    } else {
                      setValue(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== "") {
                      filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  id="free-solo-dialog-demo"
                  options={quizCollections}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.name;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  renderOption={(props, option) => (
                    <li {...props}>{option.name}</li>
                  )}
                  sx={{
                    width: "300px",
                    display: "relative",
                    marginBottom: "4%",
                  }}
                  freeSolo
                  renderInput={(params) => <TextField {...params} />}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    color: "white",
                    background: "gray",
                    borderRadius: "16px",
                    ":hover": { background: "#ffc450", color: "black" },
                  }}
                  onClick={handleAddQuiz}
                >
                  추가하기
                </Button>
              </Box>
            </Modal>
          </React.Fragment>
          {Array(4)
            .fill(null)
            .map((_, i) => {
              const value =
                resultObject.problemList[currentIndex].blanks[
                  `blank_${i + 1}` as keyof Blanks
                ];

              return value === null ? null : (
                <TextField
                  key={i}
                  label={`빈칸 ${i + 1}`}
                  value={value}
                  margin="none"
                  variant="standard"
                  sx={{
                    display: "block", // Ensure the element is block-level
                    margin: "0 auto", // Center the element horizontally
                    "& .MuiInputLabel-root": {
                      color: "#FE9F2C",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#FE9F2C",
                    },
                  }}
                />
              );
            })}

          <IconButton
            aria-label="forward"
            size="small"
            sx={{
              color: "gray",
              position: "absolute",
              left: "16px",
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
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={handleNext}
          >
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
          <VerticalLine></VerticalLine>
          <LabelQuestion2>해설</LabelQuestion2>
          <LabelSolution>
            {`${resultObject.problemList[currentIndex].explanation}`}
          </LabelSolution>
        </FormContainer>
      </FormContainerNew>
    </CenteredContainer>
  );
}

export default QuizCommentaryBlank;
