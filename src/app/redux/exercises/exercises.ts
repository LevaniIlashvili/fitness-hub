import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise } from "../../models/exercise.model";

const initialState: Exercise[] = [];

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercises(state, action: PayloadAction<Exercise[]>) {
      return action.payload;
    },
  },
});

export const { addExercises } = exercisesSlice.actions;
export default exercisesSlice.reducer;
