import React, { useEffect, useState } from "react";
import { fetchExercisesData } from "../../fetchExercisesData";
import { dummyExercises } from "../../data";

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

  useEffect(() => {
    if (!searchText) return;
    searchExercises();
  }, [searchText]);

  console.log(exercises);

  return (
    <div>
      <label>Search for exercises</label>
      <input type="search" onChange={(e) => setSearchText(e.target.value)} />
      {bodyParts?.map((bodyPart, index) => {
        return (
          <div key={index}>
            <label>{bodyPart}</label>
            <input
              type="radio"
              name="body_parts"
              id={bodyPart}
              checked={bodyPart === selectedBodyPart}
              onChange={() => setSelectedBodyPart(bodyPart)}
            />
          </div>
        );
      })}
      {exercises.map((exercise) => {
        return (
          <div key={exercise.id}>
            <p>{exercise.name}</p>
            <img src={exercise.gifUrl} />
          </div>
        );
      })}
    </div>
  );
};

export default ExercisesPage;
