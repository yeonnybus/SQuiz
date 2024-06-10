import axios from "axios";

// API 요청을 위한 기본 URL 설정
// const API_BASE_URL = "api/api/v1";
// const IP = "api";

const API_BASE_URL = "http://52.78.150.74:8080/api/v1";
const IP = "http://52.78.150.74:8080";

export interface CheckedBlanks {
  chekedBlank_1: string | null;
  chekedBlank_2: string | null;
  chekedBlank_3: string | null;
  chekedBlank_4: string | null;
}

export interface ProblemForSubmit {
  problemNo: number;
  checkedAnswer: string;
  checkedBlanks: CheckedBlanks;
}

export interface QuizSubmission {
  quizId: number;
  problems: ProblemForSubmit[];
}

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

export const idDuplicationCheck = async (memberId: string): Promise<void> => {
  try {
    // axios.get을 사용하여 서버에 요청을 보냄

    const response = await axios.get(
      `${API_BASE_URL}/member/check-id-duplication?memberId=${memberId}`
    );

    // 서버의 응답 처리
    // 응답 구조 및 처리 방법은 API의 구현에 따라 다를 수 있음
    console.log("사용 가능한 ID입니다.");
  } catch (error) {
    // 에러 처리
    if (axios.isAxiosError(error)) {
      //console.log("ID 중복 검사 중 에러 발생:", error.response?.status);
      console.error("중복된 ID 입니다. 다른 ID를 입력해주세요.");
    }
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

// pdf 업로드
export const uploadPdfFile = async (
  token: string,
  files: File[],
  selectedSubject: string | null
) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });

  try {
    const response = await axios.post(
      `${API_BASE_URL}/upload/upload-pdf?subjectType=${selectedSubject}`,
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

export const orderQuiz = async (
  jwtToken: string,
  pdfId: number,
  quizName: string | null,
  subject: string | null,
  startPage: number,
  endPage: number,
  quizType: string,
  problemNum: string,
  rank: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/quiz/generate-quiz`,
      {
        pdfId,
        quizName,
        subject,
        startPage,
        endPage,
        quizType,
        problemNum,
        rank,
      },
      {
        headers: {
          Authorization: jwtToken,
        },
      }
    );

    console.log("퀴즈 요청 성공");
    return response;
    //return response.data.userId; // 서버 리스폰스 보고 수정
  } catch (error) {
    console.error("퀴즈 요청 실패:", error);
    throw new Error("퀴즈 요청 실패");
  }
};

// pdf 업로드
export const quizSubmit = async (token: string, submission: QuizSubmission) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/quiz/check-quiz`,
      submission,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

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

export const loadFruitBasket = async (token: String) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fruit-basket/load`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // 에러 처리
    if (axios.isAxiosError(error)) {
      //console.log("ID 중복 검사 중 에러 발생:", error.response?.status);
      console.error("과일바구니 불러오기 오류");
    }
  }
};

//채점 후 문제 별 정보 요청 api
export const answerDetailRequest = async (token: string, quizId: number) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/quiz/quiz-detail`,
      { quizId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const makeBasket = async (
  token: string,
  fruitBasketName: string,
  subject: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/fruit-basket/make`,
      { subject, fruitBasketName },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createSummary = async (token: string, pdfId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/summary/generate?pdfId=${pdfId}`,

      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const viewSummary = async (token: string, quizId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/summary/load?quizId=${quizId}`,

      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const loadLastQuizList = async (token: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/quiz/load-quizList`,

      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const checkQuizResult = async (token: string, quizId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/quiz/checked-quiz-result?quizId=${quizId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addProblem = async (
  token: string,
  fruitBasketId: number,
  problemId: number,
  quizType: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/fruit-basket/add-problem`,
      { fruitBasketId, problemId, quizType },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const loadQuizInBasket = async (
  token: string,
  fruitBasketId: number
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/fruit-basket/load-problems`,
      { fruitBasketId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
