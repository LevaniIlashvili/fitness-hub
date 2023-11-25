import React from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const LoadingScreen = () => {
  return (
    <LoadingWrapper>
      <ClipLoader color="#f76707" size={100} />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.section`
  height: calc(100vh - 10rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoadingScreen;
