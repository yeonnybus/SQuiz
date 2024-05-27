import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
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
  padding-top: 2vh;
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
  padding-left: 17.5%;
  padding-top: 1%;
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
  margin-left: 6%;
  margin-top: 0.3%;
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
interface LabelProps {
  isAnswer: boolean;
  isChecked: boolean;
}

interface ProblemList {
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

interface QuizCollectionOptionType {
  inputValue?: string;
  name: string;
}

const filter = createFilterOptions<QuizCollectionOptionType>();

function QuizCommentary() {
  // 프론트단 관리 state
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 현재 인덱스
  const location = useLocation();

  // 서버에서 넘어올건데 임시 state
  const problemNum: number = 10; // 문제 수

  const answer: string = "a";
  const checkedAnswer: string = "d";
  const problemList: ProblemList = {
    // 사용자 입력 선택지
    option_a: "a입니다",
    option_b: "b입니다",
    option_c: "C입니다",
    option_d: "d입니다",
  };
  const quizName: string = "퀴즈이름~ 운영체제 페이징 어쩌구~"; // 퀴즈이름
  const isCorrect: boolean = false; // 정오답(아이콘분류)

  // 더미 데이터 state로 관리
  const [quizCollections, setQuizCollections] = useState<
    readonly QuizCollectionOptionType[]
  >([
    { name: "과일바구니 1" },
    { name: "과일바구니 2" },
    { name: "과일바구니 3" },
    { name: "과일바구니 4" },
    { name: "과일바구니 5" },
  ]);

  const [value, setValue] = useState<QuizCollectionOptionType | null>(null); // autocomplete에서 지정된 값

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

  // 새로운 값을 목록에 추가
  const handleAddNewValue = (newValue: string) => {
    const newQuizCollection = { name: newValue };
    setQuizCollections((prev) => [...prev, newQuizCollection]);
    setValue(newQuizCollection);
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
            onClick={handleNext}
          >
            <ArrowBackIosNewOutlinedIcon />
          </IconButton>
          <LabelBig>QUIZ : {quizName}</LabelBig>
        </Inline>
        <FormContainer>
          <LabelMini2>KC값입니다</LabelMini2>
          <Inline2>
            {isCorrect ? (
              <CircleOutlinedIcon
                sx={{
                  fontSize: "50px",
                  position: "absolute",
                  marginTop: "-15px",
                  marginLeft: "16px",
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
              문제입니다 문제입니다 문제입니다 문제입니다 문제입니다 문제입니다
            </LabelQuestion>
          </Inline2>
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
                >
                  추가하기
                </Button>
              </Box>
            </Modal>
          </React.Fragment>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              padding: "10px",
              paddingTop: "0px",
              paddingLeft: "15vw",
              paddingRight: "15vw",
            }}
          >
            <Grid item xs={6}>
              <LabelOption
                isAnswer={answer === "a"}
                isChecked={checkedAnswer === "a"}
              >{`(a)\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${problemList.option_a} `}</LabelOption>
            </Grid>
            <Grid item xs={6}>
              <LabelOption
                isAnswer={answer === "b"}
                isChecked={checkedAnswer === "b"}
              >{`(b)\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${problemList.option_b}`}</LabelOption>
            </Grid>
            <Grid item xs={6}>
              <LabelOption
                isAnswer={answer === "c"}
                isChecked={checkedAnswer === "c"}
              >{`(c)\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${problemList.option_c}`}</LabelOption>
            </Grid>
            <Grid item xs={6}>
              <LabelOption
                isAnswer={answer === "d"}
                isChecked={checkedAnswer === "d"}
              >{`(d)\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${problemList.option_d}`}</LabelOption>
            </Grid>
          </Grid>
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
          <LabelQuestion>해설</LabelQuestion>
          <LabelSolution>
            asdasdsadsadaseㅁㅁasdasdsadsadaseㅁㅁasdasdsadsadaseㅁㅁasdasdsadsadaseㅁㅁasdasdsadsadaseㅁㅁasdasdsadsadaseㅁㅁasdasdsadsadaseㅁㅁasdasdsadsadaseㅁㅁdsadas
          </LabelSolution>
        </FormContainer>
      </FormContainerNew>
    </CenteredContainer>
  );
}

export default QuizCommentary;
