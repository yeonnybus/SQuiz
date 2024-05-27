import React from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/makequiz" element={<MakeQuiz />} />
        <Route path="/makequiz2" element={<MakeQuiz2 />} />
        <Route path="/fruitbasket" element={<FruitBasket />} />
        <Route path="/quizinbasket" element={<QuizInBasket />} />
        <Route path="/lastquiz" element={<LastQuizList />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quizresult" element={<QuizResult />} />
        <Route path="/quizdetail" element={<QuizDetail />} />
        <Route path="/quizcommentary" element={<QuizCommentary />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
