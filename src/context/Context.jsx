import React, { createContext, useState, useMemo, useEffect } from "react";

export const QuizContext = createContext(null);

const Context = (props) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [indexVisible, setIndexVisible] = useState(0);
  const [loading, setLoading] = useState(false);

  const contextValue = useMemo(
    () => ({
      selected,
      setSelected,
      indexVisible,
      setIndexVisible,
      data,
      setData,
      loading,
    }),
    [
      selected,
      setSelected,
      indexVisible,
      setIndexVisible,
      data,
      setData,
      loading,
    ]
  );

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://johnmeade-webdev.github.io/chingu_quiz_api/trial.json"
    );
    const result = await response.json();
    const newData = result.map((ele, ind) => ({ uniqueId: ind + 1, ...ele }));
    setLoading(false);
    setData(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <QuizContext.Provider value={contextValue}>
      {props.children}
    </QuizContext.Provider>
  );
};

export default Context;
