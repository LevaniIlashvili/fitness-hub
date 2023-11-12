import React, { useEffect, useState } from "react";
import { fetchExercisesData } from "../../fetchExercisesData";
import { dummyExercises } from "../../data";
import styled from "styled-components";

const ExercisesPage = () => {
  const [exercises, setExercises] = useState(dummyExercises);
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const [searchText, setSearchText] = useState("");

  const bodyParts = [
    "all",
    "back",
    "cardio",
    "chest",
    "lower arms",
    "lower legs",
    "neck",
    "shoulders",
    "upper arms",
    "upper legs",
    "waist",
  ];

  // const getAllExercises = async () => {
  //   const allExercises = await fetchExercisesData(
  //     "https://exercisedb.p.rapidapi.com/exercises"
  //   );
  //   setExercises(allExercises);
  // };

  const getExercisesByBodyPart = async () => {
    // const exercises = await fetchExercisesData(
    //   `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`
    // );
    if (selectedBodyPart === "all") {
      setExercises(dummyExercises);
    } else {
      setExercises(
        dummyExercises.filter(
          (exercise) => exercise.bodyPart === selectedBodyPart
        )
      );
    }
  };

  const searchExercises = async () => {
    setExercises(
      dummyExercises.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchText) ||
          exercise.target.toLowerCase().includes(searchText) ||
          exercise.equipment.toLowerCase().includes(searchText) ||
          exercise.bodyPart.toLowerCase().includes(searchText)
      )
    );
  };

  // useEffect(() => {
  //   getAllExercises();
  // }, []);

  useEffect(() => {
    if (!selectedBodyPart) return;
    getExercisesByBodyPart();
  }, [selectedBodyPart]);

  console.log(exercises);

  return (
    <Wrapper>
      <div className="search__container">
        <input
          type="search"
          onChange={(e) => setSearchText(e.target.value)}
          className="search__input"
          placeholder="Search For Exercises"
        />
        <button className="search__button" onClick={searchExercises}>
          Search
        </button>
      </div>
      <ul className="body-parts__container">
        {bodyParts?.map((bodyPart, index) => {
          return (
            <li key={index}>
              <input
                type="radio"
                name="body_parts"
                id={bodyPart}
                checked={bodyPart === selectedBodyPart}
                onChange={() => setSelectedBodyPart(bodyPart)}
              />
              <label htmlFor={bodyPart}>{bodyPart}</label>
            </li>
          );
        })}
      </ul>
      <section className="exercises__container">
        {exercises.map((exercise) => {
          return (
            <div className="exercise__container" key={exercise.id}>
              <p>{exercise.name}</p>
              <img src={exercise.gifUrl} />
            </div>
          );
        })}
      </section>
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
    width: 60rem;
    height: 100%;
    border: 1px solid #adb5bd;
    border-right: none;
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

  .body-parts__container {
    display: flex;
    gap: 0.5rem;
    list-style: none;
  }

  .body-parts__container input {
    display: none;
  }

  .body-parts__container label {
    padding: 1rem;
    border: 1px solid var(--gray);
    border-radius: 3px;
    cursor: pointer;
  }

  .body-parts__container label:hover {
    border-color: var(--orange);
  }

  .body-parts__container label:active {
    background-color: var(--orange);
    color: var(--white);
  }

  .body-parts__container input[type="radio"]:checked + label {
    background-color: var(--dark-orange);
    border-color: var(--dark-orange);
    color: var(--white);
  }

  .exercises__container {
    width: 80vw;
    display: flex;
    flex-wrap: wrap;
  }

  .exercise__container {
    width: calc(80vw / 3);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .exercise__container img {
    width: 100%;
  }
`;

export default ExercisesPage;
