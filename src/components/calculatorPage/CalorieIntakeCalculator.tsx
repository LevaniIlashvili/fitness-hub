import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RadioBtn from "../RadioBtn";

const CalorieIntakeCalculator = () => {
  const [gender, setGender] = useState<string>("male");
  const [age, setAge] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [activity, setActivity] = useState<string>("moderatelyActive");
  const [calories, setCalories] = useState<number>(0);
  const [TDEE, setTDEE] = useState<number>(0);

  useEffect(() => {
    if (!gender || !age || !height || !weight || !activity) return;

    let BMR: number = 0;

    if (gender === "male") {
      BMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }

    switch (activity) {
      case "sedentary":
        setTDEE(BMR * 1.2);
        break;
      case "lightlyActive":
        setTDEE(BMR * 1.375);
        break;
      case "moderatelyActive":
        setTDEE(BMR * 1.55);
        break;
      case "veryActive":
        setTDEE(BMR * 1.725);
        break;
      case "extremelyActive":
        setTDEE(BMR * 1.9);
        break;
      default:
        break;
    }
  }, [gender, age, height, weight, activity]);

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(+e.target.value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(+e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(+e.target.value);
  };

  const handleActivityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivity(e.target.value);
  };

  const handleCalculateClick = () => {
    setCalories(Math.round(TDEE));
  };

  return (
    <Wrapper>
      <h1 className="header">
        <span>Calorie</span> Calculator
      </h1>
      <div className="radio-btn-container">
        <RadioBtn
          name="gender"
          id="male"
          labelName="Male"
          isChecked={gender === "male"}
          handleChange={handleGenderChange}
        />
        <RadioBtn
          name="gender"
          id="female"
          labelName="Female"
          isChecked={gender === "female"}
          handleChange={handleGenderChange}
        />
      </div>
      <div className="text-input-container">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          onChange={handleAgeChange}
          type="text"
          placeholder="Enter your age"
        />
      </div>
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
      <div className="select-container">
        <label htmlFor="activity">Activity</label>
        <select
          id="activity"
          value={activity}
          onChange={handleActivityChange}
          name="activity"
        >
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="lightlyActive">
            Lightly active (light exercise/sports 1-3 days/week)
          </option>
          <option value="moderatelyActive">
            Moderately active (moderate exercise/sports 3-5 days/week)
          </option>
          <option value="veryActive">
            Very active (hard exercise/sports 6-7 days a week)
          </option>
          <option value="extremelyActive">
            Extremely active (very hard exercise/sports & physical job or 2x
            training)
          </option>
        </select>
      </div>
      <button onClick={handleCalculateClick}>Calculate</button>
      {calories ? (
        <div>
          <h3>
            Weight Loss:{" "}
            <span className="calories">{calories - 500} calories/day</span>
          </h3>
          <h3>
            Maintain Weight:{" "}
            <span className="calories">{calories} calories/day</span>
          </h3>
          <h3>
            Weight Gain:{" "}
            <span className="calories">{calories + 500} calories/day</span>
          </h3>
          <h3></h3>
        </div>
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

  .radio-btn-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
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

  .select-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 52rem;

    select {
      width: 100%;
      height: 3rem;
      font-size: 1.6rem;
      outline: none;
    }
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

  .calories {
    font-weight: 500;
  }
`;

export default CalorieIntakeCalculator;
