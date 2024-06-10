import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Register2 from "./pages/Register2";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import FindId from "./pages/FindId";
import FindPw from "./pages/FindPw";
import MakeQuiz from "./pages/MakeQuiz";
import MakeQuiz2 from "./pages/MakeQuiz2";
import FruitBasket from "./pages/FruitBasket";
import Quiz from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";
import QuizDetail from "./pages/QuizDetail";
import QuizCommentary from "./pages/QuizCommentary";
import LastQuizList from "./pages/LastQuizList";
import QuizInBasket from "./pages/QuizInBasket";
import Summary from "./pages/Summary";

import QuizOx from "./pages/QuizOx";
import QuizBlank from "./pages/QuizBlank";
import QuizCommentaryOx from "./pages/QuizCommentaryOx";
import QuizCommentaryBlank from "./pages/QuizCommentaryBlank";
import RegisterFin from "./pages/RegisterFin";
import First from "./pages/First";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/registerfin" element={<RegisterFin />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/makequiz" element={<MakeQuiz />} />
        <Route path="/makequiz2" element={<MakeQuiz2 />} />
        <Route path="/fruitbasket" element={<FruitBasket />} />
        <Route path="/quizinbasket" element={<QuizInBasket />} />
        <Route path="/lastquiz" element={<LastQuizList />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quizox" element={<QuizOx />} />
        <Route path="/quizblank" element={<QuizBlank />} />
        <Route path="/quizresult" element={<QuizResult />} />
        <Route path="/quizdetail" element={<QuizDetail />} />
        <Route path="/quizcommentary" element={<QuizCommentary />} />
        <Route path="/quizcommentaryox" element={<QuizCommentaryOx />} />
        <Route path="/quizcommentaryblank" element={<QuizCommentaryBlank />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />{" "}
        {/* 정의되지 않은 경로에 대한 처리 */}
      </Routes>
    </div>
  );
}

export default App;
