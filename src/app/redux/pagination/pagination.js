import { createSlice } from "@reduxjs/toolkit";

const pagination = createSlice({
  name: "pagination",
  initialState: {
    currentPage: 0,
  },
  reducers: {
    goToNextPage: (state) => {
      state.currentPage++;
    },
    goToPreviousPage: (state) => {
      state.currentPage--;
    },
    goToPage: (state, action) => {
      console.log(action);
      state.currentPage = action.payload;
    },
  },
});

export const { goToNextPage, goToPreviousPage, goToPage } = pagination.actions;

export default pagination.reducer;
