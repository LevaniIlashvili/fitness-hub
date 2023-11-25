import React from "react";
import ExercisesPage from "./pages/ExercisesPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExercisePage from "./pages/ExercisePage.tsx";
import Navbar from "./components/Navbar.tsx";
import FoodSearchPage from "./pages/FoodSearchPage.jsx";
import FoodNutrientsPage from "./pages/FoodNutrientsPage.tsx";
import CalculatorsPage from "./pages/CalculatorsPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ExercisesPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/exercises/:id" element={<ExercisePage />} />
        <Route path="/food" element={<FoodSearchPage />} />
        <Route path="/food/:id" element={<FoodNutrientsPage />} />
        <Route path="/calculator" element={<CalculatorsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
