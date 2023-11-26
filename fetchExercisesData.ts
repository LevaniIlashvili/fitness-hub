import axios from "axios";

const options = {
  params: {
    limit: 1500,
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_EXERCISES_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchExercisesData = async (url: string) => {
  const response = await axios.get(url, options);
  return response.data;
};
