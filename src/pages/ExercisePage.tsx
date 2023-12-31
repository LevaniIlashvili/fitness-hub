import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Exercise } from "../../types/main";
import styled from "styled-components";
import upperBodyIcon from "../assets/upper-body.png";
import targetIcon from "../assets/target.png";
import dumbellIcon from "../assets/dumbell.png";
import SimilarExercises from "../components/exercisePage/SimilarExercises";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { IoIosArrowRoundBack } from "react-icons/io";

const ExercisePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchExercise = async () => {
    try {
      const response = await axios.get(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
        {
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_EXERCISES_KEY,
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );
      setIsLoading(false);
      setExercise(response.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExercise();
  }, []);

  if (isLoading) return <LoadingScreen />;

  if (!exercise) return <ErrorScreen />;

  return (
    <Wrapper>
      <div className="exercise__container">
        <IoIosArrowRoundBack
          className="back-arrow-icon"
          onClick={() => navigate("/exercises")}
        />
        <div className="exercise__img-container">
          <img
            className="exercise__img"
            src={exercise.gifUrl}
            alt={`gif of showing how to do ${exercise.name}`}
          />
        </div>
        <div>
          <h1 className="exercise__header">{exercise.name}</h1>
          <p className="exercise__instructions">{...exercise.instructions}</p>
          <span className="exercise__category">
            <img
              className="category__icon"
              src={upperBodyIcon}
              alt="icon of human body"
            />
            {exercise.bodyPart}
          </span>
          <span className="exercise__category">
            <img
              className="category__icon"
              src={targetIcon}
              alt="icon of target"
            />
            {exercise.target}
          </span>
          <span className="exercise__category">
            <img
              className="category__icon"
              src={dumbellIcon}
              alt="icon of dumbell"
            />
            {exercise.equipment}
          </span>
        </div>
      </div>
      <SimilarExercises
        exerciseTarget={exercise.target}
        exerciseName={exercise.name}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding-top: 8rem;

  .back-arrow-icon {
    font-size: 7rem;
    cursor: pointer;
    color: var(--dark-orange);
    position: absolute;
    top: 0;
    left: 0;
  }

  .exercise__container {
    position: relative;
    padding-top: 5rem;
    display: flex;
    margin-bottom: 5rem;
  }

  .exercise__img {
    width: 50vw;
    max-width: 60rem;
    height: 50vw;
    max-height: 60rem;
  }

  .exercise__header {
    font-size: 4.5rem;
    margin-bottom: 3rem;
  }

  .exercise__instructions {
    font-size: 1.8rem;
    font-weight: 400;
    margin-bottom: 3rem;
    line-height: 2.5rem;
  }

  .exercise__category {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .category__icon {
    width: 7rem;
    background-color: #af7b147d;
    padding: 1.5rem;
    border-radius: 50%;
  }

  @media (max-width: 800px) {
    .exercise__container {
      flex-direction: column;
      align-items: center;
      padding: 3rem;
    }

    .exercise__img {
      width: 70vw;
      height: 70vw;
    }
  }

  @media (max-width: 500px) {
    .exercise__header {
      font-size: 3rem;
    }

    .exercise__instructions {
      font-size: 1.5rem;
    }
  }
`;

export default ExercisePage;
