import React from "react";
import ExercisesPage from "./pages/ExercisesPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExercisePage from "./pages/ExercisePage.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/exercises/:id" element={<ExercisePage />} />
        <Route path="*" element={<ExercisesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
