import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Pagination {
  currentPage: number;
}

const initialState: Pagination = {
  currentPage: 0,
};

const pagination = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    goToNextPage: (state) => {
      state.currentPage++;
    },
    goToPreviousPage: (state) => {
      state.currentPage--;
    },
    goToPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { goToNextPage, goToPreviousPage, goToPage } = pagination.actions;

export default pagination.reducer;
