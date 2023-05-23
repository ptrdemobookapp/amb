import React, { useState, useRef, useEffect } from "react";
import { useQuestionForm } from "../hooks/useQuestionForm";
import { Typewriter } from "./Typewriter";
import { AudioPlayer } from "./AudioPlayer";

const InitialQuestionString = "What is The Minimalist Entrepreneur about?";

export const QuestionForm = ({ initialQuestion = null }) => {
  const [doneTyping, setDoneTyping] = useState(false);
  const textareaRef = useRef(null);

  const {
    loading,
    questionString,
    question,
    handleChange,
    handleSubmit,
    handleLuckyClick,
    handleResetClick,
  } = useQuestionForm({
    initialQuestionString: InitialQuestionString,
    initialQuestion,
    textareaRef,
  });

  useEffect(() => {
    if (!loading || !doneTyping) return;

    setDoneTyping(false);
  }, [loading]);

  // an ugly hack to put the caret at the end of the textarea
  useEffect(() => {
    if (!textareaRef.current) return;

    const inputEl = textareaRef.current;
    const len = inputEl.value.length;
    inputEl.focus();
    inputEl.setSelectionRange(len, len);
  }, [textareaRef]);

  const handleDoneTyping = () => {
    setDoneTyping(true);
  };

  return (
    <form>
      <textarea
        className="block w-full p-2 border border-black rounded-md"
        value={questionString}
        onChange={handleChange}
        disabled={loading}
        ref={textareaRef}
        autoFocus
      ></textarea>

      <div className="mt-4 text-left">
        {!question && (
          <>
            <button
              type="button"
              className="rounded py-2 px-4 text-lg bg-black text-white mr-4"
              onClick={handleSubmit}
              disabled={loading}
            >
              Ask question
            </button>
            <button
              type="button"
              className="rounded py-2 px-4 text-lg bg-gray-200"
              onClick={handleLuckyClick}
              disabled={loading}
            >
              I'm feeling lucky
            </button>

            {loading && <p className="mt-2">Loading...</p>}
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

        <AudioPlayer
          play={question}
          src={question ? question.audio_src_url : null}
        />
      </div>
    </form>
  );
};
