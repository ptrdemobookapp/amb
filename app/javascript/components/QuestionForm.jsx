import React, { useState } from "react";
import { useQuestionForm } from "../hooks/useQuestionForm";
import Typewriter from "./Typewriter";

const InitialQuestionString = "What is The Minimalist Entrepreneur about?";

export const QuestionForm = () => {
  const [doneTyping, setDoneTyping] = useState(false);

  const {
    questionString,
    question,
    handleChange,
    handleSubmit,
    handleLuckyClick,
    handleResetClick,
  } = useQuestionForm({ initialQuestionString: InitialQuestionString });

  const handleDoneTyping = () => {
    setDoneTyping(true);
  };

  return (
    <form>
      <textarea
        className="block w-full p-2 border border-black rounded-md"
        value={questionString}
        onChange={handleChange}
      ></textarea>

      <div className="mt-4 text-left">
        {!question && (
          <>
            <button
              type="button"
              className="rounded py-2 px-4 text-lg bg-black text-white mr-4"
              onClick={handleSubmit}
            >
              Ask question
            </button>
            <button
              type="button"
              className="rounded py-2 px-4 text-lg bg-gray-200"
              onClick={handleLuckyClick}
            >
              I'm feeling lucky
            </button>
          </>
        )}

        {question && (
          <>
            <div className="my-4 text-left">
              <strong className="font-bold">Answer:</strong>{" "}
              <Typewriter
                text={question.answer}
                onTypingComplete={handleDoneTyping}
              />
            </div>
            {doneTyping && (
              <button
                type="button"
                className="rounded py-2 px-4 text-lg bg-black text-white mr-4"
                onClick={handleResetClick}
              >
                Ask another question
              </button>
            )}
          </>
        )}
      </div>
    </form>
  );
};
