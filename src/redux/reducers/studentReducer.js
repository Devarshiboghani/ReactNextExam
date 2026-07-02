import { createSlice } from "@reduxjs/toolkit";

import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../actions/studentAction";

const initialState = {
  isLoading: false,
  students: [],
  student: null,
  isError: "",
  isCreate: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    // GET
    builder.addCase(getStudents.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.students = action.payload;
    });

    builder.addCase(getStudents.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // ADD
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });

    // DELETE
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.students = state.students.filter(
        (item) => item._id !== action.payload,
      );
    });

    // UPDATE
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      state.students = state.students.map((item) =>
        item._id === action.payload._id ? action.payload : item,
      );
    });
  },
});

export default studentSlice.reducer;
