import React, { useContext, useState } from "react";
import { QuizContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import QuestionGrid from "../QuestionGrid/QuestionGrid";
import { ThreeDots } from "react-loader-spinner";
import "./Quiz.css";

const Quiz = () => {
  const [sortByCategory, setSortByCategory] = useState("mixed");
  const navigate = useNavigate();
  const {
    data,
    setData,
    selected,
    setSelected,
    indexVisible,
    setIndexVisible,
    loading,
  } = useContext(QuizContext);

  const getNextOption = () => {
    setIndexVisible((indexVisible) => indexVisible + 1);
  };

  const getPreviousoption = () => {
    setIndexVisible((indexVisible) => indexVisible - 1);
  };

  const saveAnswer = (key) => {
    const answer = {
      selected_id: indexVisible,
      opt: key,
      ans: data[indexVisible]?.answer,
    };
    const newSelected = selected.filter(
      (item) => item.selected_id !== indexVisible
    );
    setSelected([...newSelected, answer]);
  };

  const handleSubmit = () => {
    navigate("/result");
  };

  const handleCategory = (e) => {
    const val = e.split(",");
    setSortByCategory(e);
    setSelected([]);
    setIndexVisible(0);
    const newData = [...data];
    if (e === "mixed") {
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      shuffleArray(newData);
      setData(newData);
      return;
    }
    newData.sort((ele1, ele2) => {
      const topicAIndex = val.indexOf(ele1.topic);
      const topicBIndex = val.indexOf(ele2.topic);
      return topicAIndex - topicBIndex;
    });
    setData([...newData]);
  };

  return (
    <div className="chingu-quiz__container">
      <div className="chingu-quiz__number-container">
        <p>
          Ques- {indexVisible + 1}/{data?.length}
        </p>
        <select
          className="select-box"
          onChange={(e) => handleCategory(e.target.value)}
          value={sortByCategory}
        >
          <option value="mixed">Mixed</option>
          <option value={["html", "css", "javascript"]}>html-css-js</option>
          <option value={["javascript", "css", "html"]}>js-css-html</option>
          <option value={["html", "javascript", "css"]}>html-js-css</option>
          <option value={["css", "html", "javascript"]}>css-html-js</option>
        </select>
        {indexVisible === data?.length - 1 && (
          <button className="chingu-submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
      {loading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ justifyContent: "center" }}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <>
          <h2 className="chingu-quiz__question">
            {data[indexVisible]?.question}
          </h2>
          <ul className="chingu-quiz__list">
            {data.length !== 0 &&
              Object.keys(data[indexVisible]?.choices)?.map((key) => {
                const isoptionSelected =
                  selected.find((item) => item.selected_id === indexVisible)
                    ?.opt === key;
                return (
                  <li
                    className={classNames("chingu-quiz__list-item", {
                      "chingu-quiz__list-item--active": isoptionSelected,
                    })}
                    key={key}
                    onClick={() => saveAnswer(key)}
                  >
                    {data[indexVisible]?.choices[key]}
                  </li>
                );
              })}
          </ul>
          <div className="grid-btn-container">
            <QuestionGrid />
            <div className="chingu-quiz-btn">
              <button
                className={indexVisible < 1 ? "chingu-btn--disabled" : ""}
                onClick={getPreviousoption}
                disabled={indexVisible < 1}
              >
                Previous
              </button>
              <button
                className={
                  indexVisible === data?.length - 1
                    ? "chingu-btn--disabled"
                    : ""
                }
                onClick={getNextOption}
                disabled={indexVisible === data?.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
