import React from "react";
import styled from "styled-components";
import { Exercise } from "../../../types/main";
import { useNavigate } from "react-router-dom";

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const navigate = useNavigate();

  console.log(exercise.name);

  return (
    <Wrapper
      onClick={() => {
        navigate(`/exercises/${exercise.id}`);
        window.scrollTo(0, 0);
      }}
    >
      <img src={exercise.gifUrl} />
      <div className="exercise-target__container">
        <span className="exercise-body-part">{exercise.bodyPart}</span>
        <span className="exercise-target-muscle">{exercise.target}</span>
      </div>
      <p>{exercise.name}</p>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: calc((80vw - 6rem) / 3);
  display: flex;
  flex-direction: column;
  border-top: 4px solid var(--dark-orange);
  padding-top: 0rem;
  cursor: pointer;

  img {
    width: 100%;
    height: calc((80vw - 6rem) / 3);
    margin-bottom: 0.5rem;
  }

  .exercise-target__container {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .exercise-body-part,
  .exercise-target-muscle {
    display: inline-block;
    color: var(--white);
    padding: 0.8rem 2rem;
    border-radius: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  }

  .exercise-body-part {
    background-color: var(--dark-orange);
  }

  .exercise-target-muscle {
    background-color: var(--extra-light-orange);
  }

  p {
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default ExerciseCard;
