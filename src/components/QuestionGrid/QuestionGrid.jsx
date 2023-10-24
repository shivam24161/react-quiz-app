import React, { useContext } from "react";
import { QuizContext } from "../../context/Context";
import classNames from "classnames";
import "./QuestionGrid.css";
const QuestionGrid = () => {
  const { data, selected, indexVisible, setIndexVisible } =
    useContext(QuizContext);
  return (
    <div className="question-grid__btn">
      {data?.map((_, index) => {
        const isActive = indexVisible === index;
        const isSelected = selected.find(
          ({ selected_id }) => selected_id === index
        );
        return (
          <button
            key={index}
            className={classNames(
              { "question-grid__btn--active": isActive },
              { "question-grid--answered": isSelected }
            )}
            onClick={() => setIndexVisible(index)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};
export default QuestionGrid;
