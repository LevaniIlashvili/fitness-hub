import styled from "styled-components";
import React from "react";

const ErrorScreen = () => {
  return (
    <Wrapper>
      <h1>Error Getting Content!</h1>
    </Wrapper>
  );
};

export default ErrorScreen;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 10rem);
  color: var(--dark-orange);
  font-size: 4rem;
`;
