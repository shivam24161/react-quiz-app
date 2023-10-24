import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Result/Result";
import Answers from "./components/Answers/Answers";
import "./App.css";

const App = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="chingu-quiz__wrapper">
      <Routes>
        <Route element={<Quiz />} path="/" />
        <Route element={<Result />} path="/result" />
        <Route element={<Answers />} path="/answers" />
      </Routes>
      {showScrollToTop && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
};

export default App;
