import React from "react";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <Wrapper>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: calc(100vh - 10rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 10rem;
    color: var(--dark-orange);
  }

  h2 {
    color: var(--dark-orange);
    font-size: 4rem;
  }

  p {
    font-size: 2rem;
    font-weight: 400;
    margin-top: 3rem;
  }
`;

export default ErrorPage;
