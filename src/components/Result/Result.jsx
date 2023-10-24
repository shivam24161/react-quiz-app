import React, { useContext, useEffect } from "react";
import { QuizContext } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import "./Result.css";

const Result = () => {
  const navigate = useNavigate();
  const { data, selected, setSelected, setIndexVisible } =
    useContext(QuizContext);
  const answer = selected.filter((ele) => ele.opt === ele.ans);
  useEffect(() => {
    if (data?.length === 0) {
      navigate("/");
    }
  }, [data, navigate]);
  return (
    <div className="chingu-result__container">
      <h3 className="chingu-result-heading">Result:</h3>
      <ul className="chingu-result__list">
        <li>Total Question : {data?.length}</li>
        <li>Not Attempted : {data?.length - selected?.length}</li>
        <li>Attempted : {selected?.length}</li>
        <li>
          Score : {answer?.length} / {data?.length}
        </li>
      </ul>
      <Link
        className="chingu-back-btn"
        to={"/"}
        onClick={() => {
          setSelected([]);
          setIndexVisible(0);
        }}
      >
        Restart
      </Link>
      <Link className="chinu-see-answers" to="/answers">
        See all answers
      </Link>
    </div>
  );
};
export default Result;
