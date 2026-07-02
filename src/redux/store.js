import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import studentReducer from "./reducers/studentReducer";

export const store = configureStore({
  reducer: {
    authStore: authReducer,
    studentStore: studentReducer,
  },
});