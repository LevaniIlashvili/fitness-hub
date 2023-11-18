import React from "react";
import ExercisesPage from "./pages/ExercisesPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExercisePage from "./pages/ExercisePage.tsx";
import Navbar from "./components/Navbar.tsx";
import FoodSearchPage from "./pages/FoodSearchPage.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/exercises/:id" element={<ExercisePage />} />
        <Route path="/food" element={<FoodSearchPage />} />
        <Route path="*" element={<ExercisesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
