import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { registerMember } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { idDuplicationCheck } from "../api/axios";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // 전체 화면 높이
  background: linear-gradient(
    to bottom right,
    #f8df9d,
    #f7f0ba,
    #e2f3b4
  ); // 여기에 그라데이션 적용
  font-family: "Pretendard Variable";
  font-display: swap;
  src: local("Pretendard Variable"),
    url("./PretendardVariable.ttf") format("ttf");
  font-weight: 400;
  font-style: normal;
`;

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%; // 부모 요소의 너비를 따라 가로로 전체 너비를 차지
  max-width: 500px; // 최대 너비 설정
  background-color: white;
  padding: 50px;
  border-radius: 24px;
`;

const VerificationInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 20px;
`;

const InlineContainer = styled.div`
  display: flex;
`;

// role 물어보기, email 안넘어와서 에러뜨는 것, 임시 hndReg 만듦

const Register2: React.FC = () => {
  const [memberName, setMemberName] = useState<string>("");
  const [memberId, setMemberId] = useState<string>("");
  const [memberPw, setMemberPw] = useState<string>("");
  const [memberPw2, setMemberPw2] = useState<string>("");
  const location = useLocation();
  const [memberEmail, setMemberEmail] = useState<string>(location.state.email);
  const [role, setRole] = useState("ADMIN");

  const navigate = useNavigate();

  // 사용가 입력한 이름을 memberName state에 저장
  const handlememberNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMemberName(event.target.value);
  };

  // 사용가 입력한 Id를 memberId state에 저장
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(event.target.value);
  };

  // 사용가 입력한 password를 memberPw state에 저장
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemberPw(event.target.value);
  };

  // 사용자가 입력한 pw 확인을 memberPw2 state에 저장
  const handlePassword2Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMemberPw2(event.target.value);
  };

  const handleIdCheck = async () => {
    try {
      await idDuplicationCheck(memberId);
      alert("사용 가능한 ID입니다");
    } catch (error) {
      alert("중복된 ID입니다. 다른 ID를 입력해주세요.");
    }
  };

  const handleRegister = async () => {
    try {
      await registerMember(memberEmail, memberName, memberId, memberPw, role);
      alert("회원가입 성공.");
      // 회원가입 성공 후 필요한 로직 추가 (예: 로그인 페이지로 리다이렉트)
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패.");
    }
  };

  //const handleRegister = async () => {};

  return (
    <CenteredContainer>
      <FormContainer>
        <h1>Squiz 회원가입</h1>
        <VerificationInputContainer>
          <div>이름</div>
          <TextField
            variant="outlined"
            value={memberName}
            InputProps={{
              style: {
                borderRadius: "16px",
              },
            }}
            onChange={handlememberNameChange}
          />
          <div>아이디</div>
          <InlineContainer>
            <TextField
              variant="outlined"
              value={memberId}
              color="secondary"
              sx={{ width: "95ch" }}
              InputProps={{
                style: {
                  borderRadius: "16px",
                },
              }}
              onChange={handleIdChange}
            />
            <Button
              variant="contained"
              size="small"
              sx={{
                m: 1,
                color: "white",
                background: "gray",
                borderRadius: "16px",
                ":hover": { background: "#ffc450", color: "black" },
                width: "30ch",
              }}
              onClick={handleIdCheck}
            >
              중복 확인
            </Button>
          </InlineContainer>

          <div>비밀번호</div>
          <TextField
            type="password"
            variant="outlined"
            value={memberPw}
            InputProps={{
              style: {
                borderRadius: "16px",
              },
            }}
            onChange={handlePasswordChange}
          />

          <div>비밀번호확인</div>
          <TextField
            type="password"
            variant="outlined"
            value={memberPw2}
            InputProps={{
              style: {
                borderRadius: "16px",
              },
            }}
            onChange={handlePassword2Change}
          />
        </VerificationInputContainer>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            m: 1,
            color: "white",
            background: "gray",
            borderRadius: "16px",
            ":hover": { background: "#ffc450", color: "black" },
          }}
          onClick={handleRegister}
        >
          회원가입
        </Button>
      </FormContainer>
    </CenteredContainer>
  );
};

export default Register2;
