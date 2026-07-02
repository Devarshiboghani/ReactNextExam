"use client";

import { useContext } from "react";
import StudentList from "@/components/StudentList/StudentList";
import { SearchContext } from "@/context/SearchContext";

const Home = () => {
  const { searchText } = useContext(SearchContext);

  return (
    <div className="student-homepage">
      <div className="student-homepage-header">
        <h1 className="mb-4">Student Cards</h1>
      </div>

      <StudentList showActions={false} searchText={searchText} />
    </div>
  );
};

export default Home;
