import axios from "axios";

const options = {
  params: {
    limit: 1500,
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_EXERCISES_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "Accept-Encoding": "br, gzip, compress",
  },
};

export const fetchExercisesData = async (url: string) => {
  console.log(options);
  const response = await axios.get(url, options);
  console.log(response);
  return response.data;
};
