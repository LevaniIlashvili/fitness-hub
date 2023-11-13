import { configureStore } from "@reduxjs/toolkit";
import bodyPartsReducer from "./redux/bodyParts/bodyParts";
import paginationReducer from "./redux/pagination/pagination";

const store = configureStore({
  reducer: {
    bodyParts: bodyPartsReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
