import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface bodyParts {
  selectedBodyPart: string;
}

const initialState: bodyParts = {
  selectedBodyPart: "all",
};

const bodyParts = createSlice({
  name: "bodyParts",
  initialState,
  reducers: {
    selectBodyPart: (state, action: PayloadAction<string>) => {
      state.selectedBodyPart = action.payload;
    },
  },
});

export const { selectBodyPart } = bodyParts.actions;

export default bodyParts.reducer;
