import React from "react";
import { Route, Routes } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Result/Result";
import Answers from "./components/Answers/Answers";
import "./App.css";

const App = () => {
  return (
    <div className="chingu-quiz__wrapper">
      <Routes>
        <Route element={<Quiz />} path="/" />
        <Route element={<Result />} path="/result" />
        <Route element={<Answers />} path="/answers" />
      </Routes>
    </div>
  );
};

export default App;
