import StudentForm from "@/components/StudentForm/StudentForm";
import "../../utils/auth";
import "./addStudent.css";

const AddStudent = () => {
  return (
    <div className="student-container">
      <div className="student-form-card">
        <h2>Add New Student ✍️</h2>

        <p className="student-subtitle">
          Fill all student details to create a new record
        </p>

        <StudentForm />
      </div>
    </div>
  );
};

export default AddStudent;
