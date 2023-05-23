// used GPT-4 to generate this

import React, { useState, useEffect } from "react";

export const Typewriter = ({ text, onTypingComplete }) => {
  const typingSpeed = 40; // Set the typing speed (milliseconds between each character)
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let timerId = null;
    if (typedText.length < text.length) {
      timerId = setTimeout(() => {
        setTypedText(text.substr(0, typedText.length + 1));
      }, typingSpeed);
    } else if (typeof onTypingComplete === "function") {
      onTypingComplete();
    }

    // Cleanup function to clear timeout when unmounted or when text changes
    return () => clearTimeout(timerId);
  }, [text, typedText, onTypingComplete]);

  return <span>{typedText}</span>;
};
