import { createSlice } from "@reduxjs/toolkit";

const bodyParts = createSlice({
  name: "bodyParts",
  initialState: {
    selectedBodyPart: "all",
  },
  reducers: {
    selectBodyPart: (state, action) => {
      state.selectedBodyPart = action.payload;
    },
  },
});

export const { selectBodyPart } = bodyParts.actions;

export default bodyParts.reducer;
