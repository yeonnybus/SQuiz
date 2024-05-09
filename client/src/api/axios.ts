import axios from "axios";

// API 요청을 위한 기본 URL 설정
const API_BASE_URL = "http://10.0.8.99:8080/api/v1";
const IP = "http://10.0.8.99:8080";

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
    const response = await axios.post(
      `${IP}/login`,
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      }
    );

    const token = response.headers["authorization"]; // 서버에서 반환한 JWT 토큰
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
};

// pdf 업로드
export const uploadPdfFile = async (token: string, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });

  try {
    const response = await axios.post(
      `${API_BASE_URL}/upload/upload-pdf`,
      formData,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
// id찾기 인증번호 확인 api
export const verifyIdSearchEmailCertification = async (
  email: string,
  certificationNumber: string
): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/member/find-id`, {
      email,
      certificationNumber,
    });

    console.log("Email verification successful:", response.data);
    return response.data.userId; // 서버 응답 구조에 따라 적절히 조정 필요
  } catch (error) {
    console.error("Email verification failed:", error);
    throw new Error("Email verification failed");
  }
};

// pw찾기 인증번호 확인 api
export const verifyPwSearchEmailCertification = async (
  email: string,
  certificationNumber: string
): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/member/find-pw`, {
      email,
      certificationNumber,
    });

    console.log("Email verification successful:", response.data);
    return response.data.userId; // 서버 응답 구조에 따라 적절히 조정 필요
  } catch (error) {
    console.error("Email verification failed:", error);
    throw new Error("Email verification failed");
  }
};
