import axios from "axios";

const options = {
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_EXERCISES_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchExercisesData = async (url) => {
  console.log(options);
  const response = await axios.get(url, options);
  console.log(response);
  return response.data;
};
