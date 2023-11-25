import React, { useEffect, useState } from "react";
import { fetchExercisesData } from "../../fetchExercisesData";
import styled from "styled-components";
import ExerciseCard from "../components/exercisesPage/ExerciseCard.tsx";
import Pagination from "../components/exercisesPage/Pagination.tsx";
import BodyPartsList from "../components/exercisesPage/BodyPartsList.tsx";
import { useAppSelector } from "../app/hooks.ts";
import { Exercise } from "../../types/main.ts";
import LoadingScreen from "../components/LoadingScreen.tsx";
import ErrorScreen from "../components/ErrorScreen.tsx";

const ExercisesPage = () => {
  const selectedBodyPart = useAppSelector(
    (state) => state.bodyParts.selectedBodyPart
  );
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllExercises = async () => {
    try {
      const allExercises = await fetchExercisesData(
        "https://exercisedb.p.rapidapi.com/exercises"
      );
      setIsLoading(false);
      setExercises(allExercises);
      setFilteredExercises(allExercises);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllExercises();
  }, []);

  useEffect(() => {
    if (!selectedBodyPart) return;
    setFilteredExercises(
      exercises.filter((exercise: Exercise) => {
        if (selectedBodyPart === "all") {
          return (
            exercise.name.toLowerCase().includes(searchText) ||
            exercise.target.toLowerCase().includes(searchText) ||
            exercise.equipment.toLowerCase().includes(searchText) ||
            exercise.bodyPart.toLowerCase().includes(searchText)
          );
        } else {
          return (
            (exercise.name.toLowerCase().includes(searchText) ||
              exercise.target.toLowerCase().includes(searchText) ||
              exercise.equipment.toLowerCase().includes(searchText) ||
              exercise.bodyPart.toLowerCase().includes(searchText)) &&
            exercise.bodyPart === selectedBodyPart
          );
        }
      })
    );
  }, [selectedBodyPart, searchText]);

  if (isLoading) return <LoadingScreen />;

  if (!exercises.length) return <ErrorScreen />;

  return (
    <Wrapper>
      <input
        type="search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
        className="search__input"
        placeholder="Search For Exercises"
      />
      <BodyPartsList />
      <section className="exercises__container">
        {filteredExercises
          .slice(currentPage * 9, (currentPage + 1) * 9)
          .map((exercise: Exercise) => {
            return <ExerciseCard key={exercise.id} exercise={exercise} />;
          })}
      </section>
      <Pagination exercises={filteredExercises} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  gap: 5rem;

  .search__input {
    width: 65vw;
    height: 4rem;
    font-size: 1.5rem;
    border: 1px solid #adb5bd;
    border-radius: 3px;
    padding: 1rem;
    outline: none;
    font-weight: 600;
  }

  .exercises__container {
    width: 80vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
    gap: 3rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 700px) {
    justify-content: center;
  }
`;

export default ExercisesPage;
