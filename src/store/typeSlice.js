// typeSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const typeSlice = createSlice({
  name: "type",
  initialState: {
    selectedType: "Type",
  },
  reducers: {
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
  },
});

export const { setSelectedType } = typeSlice.actions;

export default typeSlice.reducer;
