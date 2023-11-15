import React from "react";
import { useParams } from "react-router-dom";
import { dummyExercises } from "../../data";
import { Exercise } from "../../types/main";
import styled from "styled-components";
import upperBodyIcon from "../assets/upper-body.png";
import targetIcon from "../assets/target.png";
import dumbellIcon from "../assets/dumbell.png";

const ExercisePage = () => {
  // work on dummy data for now
  const { id } = useParams();

  const exercise: Exercise | undefined = dummyExercises.find(
    (exercise) => exercise.id === id
  );

  if (!exercise) return <div>error</div>;

  return (
    <Wrapper>
      <img
        className="exercise-img"
        src={exercise.gifUrl}
        alt="gif of showing how to do exercise"
      />
      <div className="text-container">
        <h1>{exercise.name}</h1>
        <p>{...exercise.instructions}</p>
        <span className="category">
          <img className="icon" src={upperBodyIcon} alt="" />{" "}
          {exercise.bodyPart}
        </span>
        <span className="category">
          <img className="icon" src={targetIcon} alt="" /> {exercise.target}
        </span>
        <span className="category">
          <img className="icon" src={dumbellIcon} alt="" />
          {exercise.equipment}
        </span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  padding-top: 10rem;

  .exercise-img {
    width: 40vw;
    height: 40vw;
  }

  h1 {
    font-size: 4.5rem;
    margin-bottom: 3rem;
  }

  p {
    font-size: 1.8rem;
    font-weight: 400;
    margin-bottom: 3rem;
    line-height: 2.5rem;
  }

  .category {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .icon {
    width: 7rem;
    background-color: #af7b147d;
    padding: 1.5rem;
    border-radius: 50%;
  }
`;

export default ExercisePage;
