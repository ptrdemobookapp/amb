import { apiFetch } from "../lib/apiFetch.js";

export const postQuestion = async (questionString) => {
  const params = { question: { question: questionString } };

  return apiFetch({
    url: "/api/questions.json",
    options: {
      method: "POST",
      body: JSON.stringify(params),
    },
  });
};

export const getQuestion = async (id) => {
  return apiFetch({ url: `/api/questions/${id}.json` });
};
