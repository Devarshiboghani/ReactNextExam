import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const persistUser = (user) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
};

// Signup
export const signUp = createAsyncThunk(
  "auth/signup",

  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/signup", userData);

      persistUser(res.data.user);
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup Failed");
    }
  },
);

// Login
export const login = createAsyncThunk(
  "auth/login",

  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/login", userData);

      persistUser(res.data.user);
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  },
);
