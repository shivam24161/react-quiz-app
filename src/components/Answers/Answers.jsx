import React, { useContext, useEffect } from "react";
import { QuizContext } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import "./Answers.css";

const Answers = () => {
  const navigate = useNavigate();
  const { data, selected } = useContext(QuizContext);
  useEffect(() => {
    if (data?.length === 0) {
      navigate("/");
    }
  }, [data, navigate]);
  return (
    <div className="answers-container">
      <div className="chingu-answer-heading__container">
        <h2 className="chingu-answer-heading">Answers:-</h2>
        <Link to="/result" className="back-to-result-link">
          Back to Result
        </Link>
      </div>
      <p className="chingu-quiz-note">
        Note:{" "}
        <span>Option selected by you if correct will be marked green</span>,{" "}
        <span>Option selected by you if incorrect will be marked red</span>,{" "}
        <span>and unattempted questions will remain neutral</span>.
      </p>
      {data?.map((ele, ind) => {
        const isSelectedEle = selected.find(
          (element) => element.selected_id === ele.uniqueId - 1
        );
        const isCorrect = isSelectedEle?.opt === ele.answer;
        return (
          <div key={ind} className="question-container">
            <h3 className="chingu-question">
              {ele.uniqueId}. {ele.question}
            </h3>
            <ul className="chingu-answer__list">
              {data.length !== 0 &&
                Object.keys(ele.choices)?.map((item) => {
                  const isOptionSelected = item === isSelectedEle?.opt;
                  return (
                    <li
                      key={item}
                      className={classNames("answer-option", {
                        "chingu-ans-selected--correct":
                          isOptionSelected && isCorrect,
                        "chingu-ans-selected--wrong":
                          isOptionSelected && !isCorrect,
                      })}
                    >
                      {item}. {ele.choices[item]}
                    </li>
                  );
                })}
            </ul>
            <p className="chingu-correct-answer">
              Correct Option: {ele.answer}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
