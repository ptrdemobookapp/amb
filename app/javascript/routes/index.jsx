import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import { QuestionPage } from "../components/QuestionPage";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/questions/:id" element={<QuestionPage />} />
    </Routes>
  </Router>
);
