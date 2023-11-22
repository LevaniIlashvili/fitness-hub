import React from "react";
import styled from "styled-components";

const TimeToBurnCalories = ({ calories }: { calories: number }) => {
  const averageWeight = 65;
  const walking5kphMET = 3.9;
  const running10kphMET = 9.8;
  const cycling15kphMET = 8;

  const timeToBurnCaloriesWalking = calories / (walking5kphMET * averageWeight);
  const timeToBurnCaloriesRunning =
    calories / (running10kphMET * averageWeight);
  const timeToBurnCaloriesCycling =
    calories / (cycling15kphMET * averageWeight);

  const formatTime = (time: number) => {
    if (time < 1) {
      return `${Math.round(time * 60)} min`;
    } else {
      const hours = Math.floor(time);
      const minutes = time % 1;
      console.log(minutes);
      return `${hours}h ${Math.round(minutes * 60)} min`;
    }
  };

  return (
    <Wrapper>
      <h3>How long would it take to burn off {calories} KCal?</h3>
      <p>Walking(5kph): {formatTime(timeToBurnCaloriesWalking)}</p>
      <p>Running(10kph): {formatTime(timeToBurnCaloriesRunning)}</p>
      <p>Cycling(15kph): {formatTime(timeToBurnCaloriesCycling)}</p>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default TimeToBurnCalories;
