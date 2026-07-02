"use client";

import { useContext } from "react";
import StudentList from "@/components/StudentList/StudentList";
import { SearchContext } from "@/context/SearchContext";
import "./dashboard.css";

const Dashboard = () => {
  const { searchText } = useContext(SearchContext);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Student Dashboard 📚</h1>

        <p>Manage all students from one place</p>
      </div>

      <StudentList showActions={true} searchText={searchText} />
    </div>
  );
};

export default Dashboard;
