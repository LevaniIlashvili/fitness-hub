import { configureStore } from "@reduxjs/toolkit";
import bodyPartsReducer from "./bodyParts/bodyParts";
import paginationReducer from "./pagination/pagination";

const store = configureStore({
  reducer: {
    bodyParts: bodyPartsReducer,
    pagination: paginationReducer,
  },
});

export default store;
