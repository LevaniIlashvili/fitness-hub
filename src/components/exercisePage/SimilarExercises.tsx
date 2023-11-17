import styled from "styled-components";
import { dummyExercises } from "../../../data";
import ExerciseCard from "../exercisesPage/ExerciseCard";
import React, { useState, useEffect } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

const SimilarExercises = ({
  exerciseTarget,
  exerciseName,
}: {
  exerciseTarget: string;
  exerciseName: string;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const exercises = dummyExercises.filter(
    (exercise) =>
      exercise.target === exerciseTarget && exercise.name !== exerciseName
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(exercises);
  console.log(screenWidth);

  const exercisePerPage = screenWidth > 800 ? 3 : screenWidth > 400 ? 2 : 1;

  return (
    <Wrapper screenwidth={screenWidth}>
      <h2>
        Similar <span>Exercises</span>
      </h2>
      <ul>
        {exercises
          .slice(
            currentPage * exercisePerPage,
            (currentPage + 1) * exercisePerPage
          )
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
          onClick={() =>
            currentPage < 9 / exercisePerPage - 1 &&
            setCurrentPage(currentPage + 1)
          }
        >
          <IoIosArrowRoundForward />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0 5rem;

  h2 {
    font-size: 3rem;
    margin-bottom: 4rem;
  }

  h2 span {
    color: var(--dark-orange);
  }

  ul {
    /* display: flex;
    justify-content: space-between;
    gap: 2rem; */
    grid-template-columns: ${(props) =>
      `repeat(${
        props.screenwidth > 800 ? 3 : props.screenwidth > 400 ? 2 : 1
      }, minmax(10rem, 1fr))`};
    column-gap: 2rem;
    display: grid;
    padding: 0 3rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 800px) {
    padding: 0 1rem;

    ul {
      padding: 0 2rem;
    }

    h2 {
      margin-bottom: 2rem;
    }
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
