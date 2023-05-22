import React from "react";

export const Layout = ({ children }) => (
  <div className="container mx-auto p-8 max-w-xl text-center">
    <a
      href="https://www.amazon.com/Minimalist-Entrepreneur-Great-Founders-More/dp/0593192397"
      className="inline-block"
    >
      <img
        src="https://m.media-amazon.com/images/P/0593192397.01._SCLZZZZZZZ_SX500_.jpg"
        height="200"
        className="h-48 rounded-md shadow-md"
      />
    </a>

    <h1 className="mt-12 text-2xl font-bold">Ask My Book</h1>

    <div className="mt-6 text-left text-gray-400 text-md">
      This is an experiment in using AI to make my book's content more
      accessible. Ask a question and AI'll answer it in real-time:
    </div>

    <div className="mt-6">{children}</div>
  </div>
);
