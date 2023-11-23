import React from "react";
import CalorieIntakeCalculator from "../components/calculatorPage/CalorieIntakeCalculator";
import styled from "styled-components";

const CalculatorsPage = () => {
  return (
    <Wrapper>
      <CalorieIntakeCalculator />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 2rem;
`;

export default CalculatorsPage;
