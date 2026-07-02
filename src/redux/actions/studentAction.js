import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStudents = createAsyncThunk(
  "student/getStudents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/students");
      return res.data.students;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addStudent = createAsyncThunk(
  "student/addStudent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/students", data);
      return res.data.student;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/students/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/students/${id}`, data);
      return res.data.student;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);