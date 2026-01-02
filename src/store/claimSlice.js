import { createSlice } from "@reduxjs/toolkit";
import { PART_A_KEYS, PART_B_KEYS } from "../constants/fields";

const initialA = PART_A_KEYS.reduce((acc, key) => {
  acc[key] = {};
  return acc;
}, {});

const initialB = PART_B_KEYS.reduce((acc, key) => {
  acc[key] = {};
  return acc;
}, {});

const initialState = {
  A: initialA,
  B: initialB,
};

const slice = createSlice({
  name: "claim",
  initialState,
  reducers: {
    updateSection(state, action) {
      const { part, sectionKey, data } = action.payload;
      state[part][sectionKey] = {
        ...state[part][sectionKey],
        ...data,
      };
    },

    clearAll() {
      return initialState;
    },
  },
});

export const { updateSection, clearAll } = slice.actions;
export default slice.reducer;

