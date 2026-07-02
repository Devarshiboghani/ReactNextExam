"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "@/redux/actions/studentAction";
import StudentCard from "../StudentCard/StudentCard";
import "./StudentList.css";

const StudentList = ({ showActions = true, searchText = "" }) => {
  const dispatch = useDispatch();

  const { students, isLoading } = useSelector((state) => state.studentStore);

  const [sortBy, setSortBy] = useState("");
  const [filterClass, setFilterClass] = useState("");

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const filteredStudents = useMemo(() => {
    let data = [...students];

    if (searchText) {
      data = data.filter(
        (student) =>
          student.name.toLowerCase().includes(searchText.toLowerCase()) ||
          student.email.toLowerCase().includes(searchText.toLowerCase()) ||
          student.phone.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (filterClass) {
      data = data.filter(
        (student) => student.class.toLowerCase() === filterClass.toLowerCase(),
      );
    }

    if (sortBy === "name") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "age") {
      data.sort((a, b) => Number(a.age) - Number(b.age));
    }

    return data;
  }, [students, sortBy, filterClass, searchText]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-light"></div>
      </div>
    );
  }

  return (
    <div className="student-list-wrapper">
      <div className="student-filter-area">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort Student</option>
          <option value="name">Sort by Name</option>
          <option value="age">Sort by Age</option>
        </select>

        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
        >
          <option value="">All Classes</option>
          <option value="10th">Class 10</option>
          <option value="11th">Class 11</option>
          <option value="12th">Class 12</option>
        </select>
      </div>

      <div className="student-grid">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              showActions={showActions}
            />
          ))
        ) : (
          <h3 className="no-data">No Student Found 😔</h3>
        )}
      </div>
    </div>
  );
};

export default StudentList;
