import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Register2 from "./pages/Register2";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/aa" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
