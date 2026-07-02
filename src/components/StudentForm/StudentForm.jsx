"use client";

import axios from "axios";
import { useRef, useState } from "react";
import { imageUpload } from "@/services/uploadImage";
import validateForm from "@/utils/auth";
import { useRouter } from "next/navigation";
import "./StudentForm.css";

const StudentForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const initialState = {
    name: "",
    phone: "",
    email: "",
    age: "",
    class: "",
    grade: "",
    image: "",
  };
  const [student, setStudent] = useState(initialState);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const validateStudentForm = () => {
    const newErrors = validateForm(student, { requireImage: true });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = async (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setUploading(true);
      const image = await imageUpload(e.target.files[0]);
      setStudent({
        ...student,
        image: image,
      });
      setUploading(false);
    } else {
      setStudent({
        ...student,
        [name]: value,
      });
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStudentForm()) return;

    try {
      const res = await axios.post("/api/students", student);

      if (res.data.success) {
        alert("Student Added Successfully");
        setStudent(initialState);
        setErrors({});
        if (fileInputRef.current) fileInputRef.current.value = "";
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={student.name}
          placeholder="Enter Name"
          onChange={handleChange}
        />
        {errors.name && <p className="error-msg">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={student.phone}
          placeholder="Enter Phone"
          onChange={handleChange}
        />
        {errors.phone && <p className="error-msg">{errors.phone}</p>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={student.email}
          placeholder="Enter Email"
          onChange={handleChange}
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={student.age}
          placeholder="Enter Age"
          onChange={handleChange}
        />
        {errors.age && <p className="error-msg">{errors.age}</p>}
      </div>

      <div className="form-group">
        <label>Class</label>
        <input
          type="text"
          name="class"
          value={student.class}
          placeholder="Enter Class"
          onChange={handleChange}
        />
        {errors.class && <p className="error-msg">{errors.class}</p>}
      </div>

      <div className="form-group">
        <label>Grade</label>
        <input
          type="text"
          name="grade"
          value={student.grade}
          placeholder="Enter Grade"
          onChange={handleChange}
        />
        {errors.grade && <p className="error-msg">{errors.grade}</p>}
      </div>

      <div className="form-group full-width">
        <label>Profile Image</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        {errors.image && <p className="error-msg">{errors.image}</p>}
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="student-btn full-width"
      >
        {uploading ? "Uploading..." : "Add Student"}
      </button>
    </form>
  );
};

export default StudentForm;
