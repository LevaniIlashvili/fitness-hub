import React, { useEffect, useState } from "react";
import { fetchExercisesData } from "../../fetchExercisesData";
import { dummyExercises } from "../../data";
import styled from "styled-components";
import ExerciseCard from "../components/ExerciseCard.tsx";
import Pagination from "../components/Pagination.tsx";
import BodyPartsList from "../components/BodyPartsList.tsx";
import { useAppSelector } from "../app/hooks.ts";
import { Exercise } from "../../types/main.ts";

const ExercisesPage = () => {
  const selectedBodyPart = useAppSelector(
    (state) => state.bodyParts.selectedBodyPart
  );
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const [exercises, setExercises] = useState<Exercise[]>(dummyExercises);
  // const [exercises, setExercises] = useState([]);
  const [searchText, setSearchText] = useState<string>("");

  // const getAllExercises = async () => {
  //   const allExercises = await fetchExercisesData(
  //     "https://exercisedb.p.rapidapi.com/exercises"
  //   );
  //   setExercises(allExercises);
  // };

  // const getExercisesByBodyPart = async () => {
  //   // const exercises = await fetchExercisesData(
  //   //   `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`
  //   // );
  //   if (selectedBodyPart === "all") {
  //     setExercises(dummyExercises);
  //   } else {
  //     setExercises(
  //       dummyExercises.filter(
  //         (exercise) => exercise.bodyPart === selectedBodyPart
  //       )
  //     );
  //   }
  // };

  // const searchExercises = async () => {
  //   setExercises(
  //     dummyExercises.filter((exercise) => {
  //       if (selectedBodyPart === "all") {
  //         if (
  //           exercise.name.toLowerCase().includes(searchText) ||
  //           exercise.target.toLowerCase().includes(searchText) ||
  //           exercise.equipment.toLowerCase().includes(searchText) ||
  //           exercise.bodyPart.toLowerCase().includes(searchText)
  //         ) {
  //           return exercise;
  //         }
  //       } else {
  //         if (
  //           (exercise.name.toLowerCase().includes(searchText) ||
  //             exercise.target.toLowerCase().includes(searchText) ||
  //             exercise.equipment.toLowerCase().includes(searchText) ||
  //             exercise.bodyPart.toLowerCase().includes(searchText)) &&
  //           exercise.bodyPart === selectedBodyPart
  //         ) {
  //           return exercise;
  //         }
  //       }
  //     })
  //   );
  // };

  // useEffect(() => {
  //   getAllExercises();
  // }, []);

  useEffect(() => {
    if (!selectedBodyPart) return;
    setExercises(
      dummyExercises.filter((exercise: Exercise): boolean => {
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

  console.log(exercises);

  return (
    <Wrapper>
      <div className="search__container">
        <input
          type="search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          className="search__input"
          placeholder="Search For Exercises"
        />
      </div>
      <BodyPartsList />
      <section className="exercises__container">
        {exercises
          .slice(currentPage * 9, (currentPage + 1) * 9)
          .map((exercise) => {
            return <ExerciseCard key={exercise.id} exercise={exercise} />;
          })}
      </section>
      <Pagination exercises={exercises} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  gap: 5rem;

  .search__container {
    height: 3.5rem;
  }

  .search__input {
    width: 65vw;
    height: 100%;
    border: 1px solid #adb5bd;
    border-radius: 3px;
    padding: 1rem;
    outline: none;
    font-weight: 600;
  }

  .search__button {
    height: 100%;
    background-color: var(--dark-orange);
    color: var(--white);
    font-weight: 600;
    border: none;
    padding: 0 3rem;
    border-radius: 3px;
    cursor: pointer;
  }

  .exercises__container {
    max-width: 80vw;
    display: flex;
    /* justify-content: center; */
    flex-wrap: wrap;
    gap: 3rem;
  }
`;

export default ExercisesPage;