import React from "react";
import styled from "styled-components";

const ExerciseCard = ({ exercise }) => {
  return (
    <Wrapper>
      <img src={exercise.gifUrl} />
      <p>{exercise.name}</p>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: calc((80vw - 6rem) / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 4px solid var(--dark-orange);

  img {
    width: 100%;
  }

  p {
    font-weight: 600;
  }
`;

export default ExerciseCard;
