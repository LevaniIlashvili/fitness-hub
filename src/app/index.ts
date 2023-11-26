import { configureStore } from "@reduxjs/toolkit";
import bodyPartsReducer from "./redux/bodyParts/bodyParts";
import paginationReducer from "./redux/pagination/pagination";
import exercisesReducer from "./redux/exercises/exercises";

const store = configureStore({
  reducer: {
    bodyParts: bodyPartsReducer,
    pagination: paginationReducer,
    exercises: exercisesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
