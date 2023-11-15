import styled from "styled-components";
import { dummyExercises } from "../../../data";
import ExerciseCard from "../exercisesPage/ExerciseCard";
import React, { useState } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

const SimilarExercises = ({
  exerciseTarget,
  exerciseName,
}: {
  exerciseTarget: string;
  exerciseName: string;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const exercises = dummyExercises.filter(
    (exercise) =>
      exercise.target === exerciseTarget && exercise.name !== exerciseName
  );

  console.log(exercises);

  return (
    <Wrapper>
      <h2>
        Similar <span>Exercises</span>
      </h2>
      <ul>
        {exercises
          .slice(currentPage * 3, (currentPage + 1) * 3)
          .map((exercise) => {
            return <ExerciseCard exercise={exercise} key={exercise.id} />;
          })}
      </ul>
      <div className="navigation-btn__container">
        <button
          className="navigation-btn navigation-btn--previous"
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
        >
          <IoIosArrowRoundBack />
        </button>
        <button
          className="navigation-btn navigation-btn--next"
          onClick={() => currentPage < 2 && setCurrentPage(currentPage + 1)}
        >
          <IoIosArrowRoundForward />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0 5rem;
  position: relative;

  h2 {
    font-size: 3rem;
    margin-bottom: 4rem;
  }

  h2 span {
    color: var(--dark-orange);
  }

  ul {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    padding: 0 3rem;
    margin-bottom: 2rem;
  }

  .navigation-btn__container {
    display: flex;
    justify-content: flex-end;
  }

  .navigation-btn {
    border: none;
    font-size: 5rem;
    color: var(--dark-orange);
    cursor: pointer;
  }
`;

export default SimilarExercises;
