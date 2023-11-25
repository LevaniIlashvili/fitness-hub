import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RadioBtn from "../RadioBtn";

const BMICalculator = () => {
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [BMI, setBMI] = useState<number>(0);

  const calculateBMI = () => setBMI(weight / (height / 100) ** 2);

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(+e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(+e.target.value);
  };

  return (
    <Wrapper>
      <h1 className="header">
        <span>BMI</span> Calculator
      </h1>
      <div className="text-input-container">
        <label htmlFor="height">Height</label>
        <input
          id="height"
          onChange={handleHeightChange}
          type="text"
          placeholder="Enter your height in cm"
        />
      </div>
      <div className="text-input-container">
        <label htmlFor="weight">Weight</label>
        <input
          id="weight"
          onChange={handleWeightChange}
          type="text"
          placeholder="Enter your weight in kg"
        />
      </div>
      <button onClick={calculateBMI}>Calculate</button>
      {BMI ? (
        BMI < 18.5 ? (
          <h3>BMI = {BMI.toFixed(1)} (Underweight)</h3>
        ) : BMI < 25 ? (
          <h3>BMI = {BMI.toFixed(1)} (Normal)</h3>
        ) : BMI < 30 ? (
          <h3>BMI = {BMI.toFixed(1)} (Overweight)</h3>
        ) : (
          <h3>BMI = {BMI.toFixed(1)} (Obese)</h3>
        )
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  border: 1px solid #a1a1a19d;
  border-radius: 3px;

  .header {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  .header span {
    color: var(--orange);
  }

  .text-input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 29rem;
  }

  label {
    font-weight: 600;
  }

  input[type="text"] {
    width: 100%;
    height: 3rem;
    padding: 0.5rem;
    font-size: 1.6rem;
    outline: none;
  }

  button {
    width: 10rem;
    border: none;
    border-radius: 3px;
    background-color: var(--dark-orange);
    color: var(--white);
    padding: 1rem;
    font-size: 1.6rem;
    font-weight: 600;
    border: 1px solid transparent;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--white);
    color: var(--dark-orange);
    border: 1px solid var(--dark-orange);
    transform: scale(1.05);
  }

  button:active {
    transform: scale(1);
    background-color: var(--dark-orange);
    color: var(--white);
    border: 1px solid transparent;
  }
`;

export default BMICalculator;
