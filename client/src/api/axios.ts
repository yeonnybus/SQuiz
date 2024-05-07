import axios from "axios";

// API 요청을 위한 기본 URL 설정
const API_BASE_URL = "http://example.com/api/v1";

// 이메일 인증 요청 api
export const sendEmailCertification = async (email: string): Promise<void> => {
  try {
    // axios를 사용하여 POST 요청
    const response = await axios.post(
      `${API_BASE_URL}/email/send-certification`,
      {
        email, // 요청 본문에 이메일 주소 포함
      }
    );

    // 요청이 성공적으로 처리되었는지 확인
    console.log("이메일 인증 요청 성공:", response.data);
  } catch (error) {
    // 오류 발생 시 처리
    console.error("이메일 인증 요청 실패:", error);
    throw new Error("이메일 인증 요청 실패");
  }
};

// 인증번호 확인 api
export const verifyEmailCertification = async (
  email: string,
  certificationNumber: string
): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/email/verify`, {
      email,
      certificationNumber,
    });

    console.log("Email verification successful:", response.data);
  } catch (error) {
    console.error("Email verification failed:", error);
    throw new Error("Email verification failed");
  }
};

// 회원가입 api
export const registerMember = async (
  memberEmail: string,
  memberName: string,
  memberId: string,
  memberPw: string,
  role: string
): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/member/join`, {
      memberEmail,
      memberName,
      memberId,
      memberPw,
      role,
    });

    console.log("회원가입 성공:", response.data);
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw new Error("회원가입 실패");
  }
};

//로그인api
export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });

    const token = response.headers["authorization"]; // 서버에서 반환한 JWT 토큰
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
};
