import React from "react";
import styled from "styled-components";
import { Grid, IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 40%; // 부모 요소의 너비를 따라 가로로 전체 너비를 차지
  margin-top: 5%;
  background-color: white;
  padding: 45px;
  padding-bottom: 15px;
  border-radius: 24px;
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  min-width: 15%; /* 필요하다면 최소 너비 지정 */
  font-size: 24px;
  font-weight: bold;

  color: black;
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

const LabelMini2 = styled.div`
  min-width: 80%; /* 필요하다면 최소 너비 지정 */
  font-size: 16px;
  display: flex;
  color: gray;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
  margin-left: 5%;
`;

const LabelMini3 = styled.div`
  min-width: 70%; /* 필요하다면 최소 너비 지정 */
  font-size: 16px;
  display: flex;
  color: black;
  text-align: center;
  justify-content: start;
  font-weight: bold;
  margin-top: 3%;
`;

const LabelMini4 = styled.div`
  min-width: 80%; /* 필요하다면 최소 너비 지정 */
  font-size: 16px;
  display: flex;
  color: gray;
  justify-content: start;
  align-items: center;
  margin-top: 3%;
`;

const InlineS2 = styled.div`
  display: flex;
  justify-content: center;
  text-align: start;
  justify-content: start;
`;
const InlineS3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

const InCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30%;
  margin-right: 5%;
  justify-content: center;
  text-align: center;
`;

const Line = styled.div`
  border-bottom: 1px solid;
  border-color: #c3c3c3;
  width: 100%;
`;

function MiniQuizExplain() {
  return (
    <FormContainer>
      <InlineS2>
        <Label>Q15.</Label>
        <LabelMini2>
          다음 연산 중 커널 모드에서만 허용되어야 하는 것들을 골라라
        </LabelMini2>
      </InlineS2>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          padding: "5px",
        }}
      >
        <Grid item xs={6}>
          <LabelMini>ㅁㄴㅇ</LabelMini>
        </Grid>
        <Grid item xs={6}>
          <LabelMini>ㅂㅈㄷ</LabelMini>
        </Grid>
        <Grid item xs={6}>
          <LabelMini>ㅂㅈㄷㄱㄷㅈㄷㅈㄱ</LabelMini>
        </Grid>
        <Grid item xs={6}>
          <LabelMini>ㄴㅇㄹㄹㄴㅇ</LabelMini>
        </Grid>
      </Grid>
      <Line />
      <LabelMini3>해설</LabelMini3>
      <LabelMini4>
        정다현바보조수아바보박나은바보정다현바보조수아바보박나은바보정다현바보조수아바보박나은바보정성연짱
      </LabelMini4>
      <KeyboardArrowRightIcon
        sx={{ width: "100%", justifyContent: "right", marginLeft: "52%" }}
      />
    </FormContainer>
  );
}

export default MiniQuizExplain;
