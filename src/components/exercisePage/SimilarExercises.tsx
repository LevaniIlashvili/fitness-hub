import styled from "styled-components";
import ExerciseCard from "../exercisesPage/ExerciseCard";
import React, { useState, useEffect } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { Exercise } from "../../../types/main";
import axios from "axios";

interface WrapperProps {
  $screenwidth: number;
}

const SimilarExercises = ({
  exerciseTarget,
  exerciseName,
}: {
  exerciseTarget: string;
  exerciseName: string;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(
        `https://exercisedb.p.rapidapi.com/exercises/target/${exerciseTarget}`,
        {
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_EXERCISES_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );
      const exercises = response.data.filter(
        (exercise: Exercise) =>
          exercise.target === exerciseTarget && exercise.name !== exerciseName
      );
      setExercises(exercises);
    } catch (error) {}
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const exercisePerPage = screenWidth > 800 ? 3 : screenWidth > 400 ? 2 : 1;

  return (
    <Wrapper $screenwidth={screenWidth}>
      <h2 className="header">
        Similar <span>Exercises</span>
      </h2>
      <ul className="exercises__container">
        {exercises
          .slice(
            currentPage * exercisePerPage,
            (currentPage + 1) * exercisePerPage
          )
          .map((exercise) => {
            return <ExerciseCard exercise={exercise} key={exercise.id} />;
          })}
      </ul>
      <nav className="navigation__container">
        <button
          className="navigation__btn"
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
        >
          <IoIosArrowRoundBack />
        </button>
        <button
          className="navigation__btn"
          onClick={() =>
            currentPage < 9 / exercisePerPage - 1 &&
            setCurrentPage(currentPage + 1)
          }
        >
          <IoIosArrowRoundForward />
        </button>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.section<WrapperProps>`
  padding: 0 5rem;

  .header {
    font-size: 3rem;
    margin-bottom: 4rem;
  }

  .header span {
    color: var(--dark-orange);
  }

  .exercises__container {
    grid-template-columns: ${(props) =>
      `repeat(${
        props.$screenwidth > 800 ? 3 : props.$screenwidth > 400 ? 2 : 1
      }, minmax(10rem, 1fr))`};
    column-gap: 2rem;
    display: grid;
    padding: 0 3rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 800px) {
    padding: 0 1rem;

    .exercises__container {
      padding: 0 2rem;
    }

    .header {
      margin-bottom: 2rem;
    }
  }

  .navigation__container {
    display: flex;
    justify-content: flex-end;
  }

  .navigation__btn {
    background-color: transparent;
    border: none;
    font-size: 5rem;
    color: var(--dark-orange);
    cursor: pointer;
  }
`;

export default SimilarExercises;
