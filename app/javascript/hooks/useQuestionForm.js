import { useState } from "react";
import { apiFetch } from "../lib/apiFetch.js";

const postQuestion = async (questionString) => {
  const params = { question: { question: questionString } };

  return apiFetch({
    url: "/api/questions.json",
    options: {
      method: "POST",
      body: JSON.stringify(params),
    },
  });
};

const getRandomQuestion = async () => {
  return apiFetch({ url: "/api/questions/random.json" });
};

export const useQuestionForm = ({ initialQuestionString }) => {
  const [question, setQuestion] = useState(null);
  const [questionString, setQuestionString] = useState(initialQuestionString);

  const handleQuestionResponse = (response) => {
    if (response.code != 200) {
      alert("This could be a better error message");
      console.log(response);
      return;
    }

    setQuestion(response.data);
  };

  const handleChange = (e) => {
    setQuestionString(e.target.value);
  };

  const handleSubmit = async () => {
    response = await postQuestion(questionString);
    handleQuestionResponse(response);
  };

  const handleLuckyClick = async () => {
    response = await getRandomQuestion(questionString);
    handleQuestionResponse(response);
  };

  const handleResetClick = () => {
    setQuestionString(initialQuestionString);
    setQuestion(null);
  };

  return {
    handleChange: handleChange,
    handleSubmit: handleSubmit,
    handleLuckyClick: handleLuckyClick,
    handleResetClick: handleResetClick,
    questionString: questionString,
    question: question,
  };
};
