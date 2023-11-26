import React from "react";
import styled from "styled-components";
import { Exercise } from "../../../types/main";
import { useNavigate } from "react-router-dom";

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const navigate = useNavigate();

  return (
    <Wrapper
      onClick={() => {
        navigate(`/exercises/${exercise.id}`);
        window.scrollTo(0, 0);
      }}
      aria-label={`View details for ${exercise.name}`}
    >
      <div className="image__container">
        <img
          className="image"
          src={exercise.gifUrl}
          alt={`Thumbnail for ${exercise.name}`}
        />
      </div>
      <div className="exercise-target__container">
        <span className="exercise-target__body-part">{exercise.bodyPart}</span>
        <span className="exercise-target__muscle">{exercise.target}</span>
      </div>
      <p className="exercise-name">{exercise.name}</p>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  border-top: 4px solid var(--dark-orange);
  padding-top: 0rem;
  cursor: pointer;

  .image__container {
    position: relative;
    overflow: hidden;
    padding-bottom: 100%; /* Set the aspect ratio */
  }

  img {
    margin-bottom: 0.5rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintain the aspect ratio and cover the container */
  }

  .exercise-target__container {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .exercise-target__body-part,
  .exercise-target__muscle {
    display: inline-block;
    color: var(--white);
    padding: 0.8rem 2rem;
    border-radius: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  }

  .exercise-target__body-part {
    background-color: var(--dark-orange);
  }

  .exercise-target__muscle {
    background-color: var(--extra-light-orange);
  }

  .exercise-name {
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default ExerciseCard;
