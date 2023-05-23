import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../components/Home";
import { QuestionPage } from "../components/QuestionPage";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questions/:id" element={<QuestionPage />} />
    </Routes>
  </Router>
);
