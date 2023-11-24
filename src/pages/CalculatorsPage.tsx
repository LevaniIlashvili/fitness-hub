import React, { useState } from "react";
import CalorieIntakeCalculator from "../components/calculatorPage/CalorieIntakeCalculator";
import styled from "styled-components";
import RadioBtn from "../components/RadioBtn";
import BMICalculator from "../components/calculatorPage/BMICalculator";

const CalculatorsPage = () => {
  const [checkedCalculator, setCheckedCalculator] =
    useState<string>("calorie-calculator");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCalculator(e.target.value);
  };

  return (
    <Wrapper>
      <div className="radio-btn-container">
        <RadioBtn
          name="calculator"
          id="calorie-calculator"
          labelName="Calorie Calculator"
          isChecked={checkedCalculator === "calorie-calculator"}
          handleChange={handleChange}
        />
        <RadioBtn
          name="calculator"
          id="bmi-calculator"
          labelName="BMI Calculator"
          isChecked={checkedCalculator === "bmi-calculator"}
          handleChange={handleChange}
        />
      </div>
      {checkedCalculator === "calorie-calculator" ? (
        <CalorieIntakeCalculator />
      ) : (
        <BMICalculator />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .radio-btn-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 4rem;
  }
`;

export default CalculatorsPage;
