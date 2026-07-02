import { createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "../actions/authAction";

const initialState = {
  user: null,
  isLoading: false,
  isError: "",
  isCreate: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isCreate = false;
      state.isError = "";
    },
  },
  extraReducers: (builder) => {

    // Signup
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.isError = "";
      state.isCreate = false;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isCreate = true;
    });

    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = "";
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;