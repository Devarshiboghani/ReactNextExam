import { useDispatch } from "react-redux";
import { deleteStudent } from "@/redux/actions/studentAction";
import { useRouter } from "next/navigation";
import "./StudentCard.css";

const StudentCard = ({ student, showActions = true }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit-student/${student._id}`);
  };

  const handleDelete = () => {
    dispatch(deleteStudent(student._id));

    alert("Student deleted successfully!");
  };

  return (
    <div className="student-cards">
      <div className="student-card">
        <div className="student-image">
          <img src={student.image} alt={student.name} />

          <div className="student-overlay">
            <h3>{student.name}</h3>
            <span>Grade {student.grade}</span>
          </div>
        </div>

        <div className="student-body">
          <p>📞 {student.phone}</p>

          <p>📧 {student.email}</p>

          <p>🎓 {student.class}</p>

          <p>🎂 {student.age} Yr</p>

          {showActions && (
            <div className="student-buttons">
              <button className="edit-btn" onClick={handleEdit}>
                Edit
              </button>

              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
