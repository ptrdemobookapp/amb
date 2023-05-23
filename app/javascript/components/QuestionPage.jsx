import React, { useEffect, useState } from "react";
import { Layout } from "./Layout";
import { QuestionForm } from "./QuestionForm";
import { useParams } from "react-router-dom";
import { getQuestion } from "../lib/questionsApi.js";

export const QuestionPage = () => {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadQuestion = async () => {
      response = await getQuestion(id);
      if (response.status === 200) {
        setQuestion(response.data);
      } else {
        alert(`Unable to load question: ${response.error}`);
      }
      setLoading(false);
    };

    loadQuestion();
  }, []);

  return (
    <Layout>
      {loading && <p>Loading...</p>}
      {!loading && !question && <p>Error</p>}
      {!loading && question && <QuestionForm initialQuestion={question} />}
    </Layout>
  );
};
