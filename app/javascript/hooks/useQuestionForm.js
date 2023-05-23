import { useState } from "react";
import { postQuestion } from "../lib/questionsApi.js";
import { useNavigate } from "react-router-dom";

const PredefinedQuestions = [
  "What is a minimalist entrepreneur?",
  "What is your definition of community?",
  "How do I decide what kind of business I should start?",
];

export const useQuestionForm = ({
  initialQuestionString,
  initialQuestion = null,
}) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [questionString, setQuestionString] = useState(
    initialQuestion ? initialQuestion.question : initialQuestionString
  );
  const navigate = useNavigate();

  const handleQuestionResponse = (response) => {
    if (response.code != 200) {
      alert("This could be a better error message");
      console.log(response);
      return;
    }

    navigate(`/questions/${response.data.id}`);
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
    const randomIndex = Math.floor(Math.random() * PredefinedQuestions.length);
    const randomQuestion = PredefinedQuestions[randomIndex];
    setQuestionString(randomQuestion);

    response = await postQuestion(randomQuestion);
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
