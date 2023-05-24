import { useState } from "react";
import { postQuestion } from "../lib/questionsApi.js";

const PredefinedQuestions = [
  "What is a minimalist entrepreneur?",
  "What is your definition of community?",
  "How do I decide what kind of business I should start?",
];

export const useQuestionForm = ({
  initialQuestionString,
  initialQuestion = null,
  textareaRef,
}) => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(initialQuestion);
  const [questionString, setQuestionString] = useState(
    initialQuestion ? initialQuestion.question : initialQuestionString
  );
  const [error, setError] = useState(null);

  const handleQuestionResponse = (response) => {
    if (response.status != 200) {
      setError(response.error);
      setLoading(false);
      console.log(response);
      return;
    }

    window.history.pushState({}, null, `/questions/${response.data.id}`);

    setQuestion(response.data);
    setLoading(false);
  };

  const handleChange = (e) => {
    setQuestionString(e.target.value);
    setQuestion(null);
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    response = await postQuestion(questionString);
    handleQuestionResponse(response);
  };

  const handleLuckyClick = async () => {
    setLoading(true);

    const randomIndex = Math.floor(Math.random() * PredefinedQuestions.length);
    const randomQuestion = PredefinedQuestions[randomIndex];
    setQuestionString(randomQuestion);

    response = await postQuestion(randomQuestion);
    handleQuestionResponse(response);
  };

  const handleResetClick = () => {
    setQuestionString(initialQuestionString);
    setQuestion(null);
    textareaRef.current.focus();
    textareaRef.current.select();
  };

  return {
    handleChange,
    handleSubmit,
    handleLuckyClick,
    handleResetClick,
    questionString,
    question,
    loading,
    error,
  };
};
