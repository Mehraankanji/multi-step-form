import { configureStore } from "@reduxjs/toolkit";
import claimReducer from "./claimSlice";

const store = configureStore({
  reducer: {
    claim: claimReducer
  }
});

export default store;
