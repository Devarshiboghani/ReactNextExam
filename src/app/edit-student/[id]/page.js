"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { imageUpload } from "@/services/uploadImage";
import validateForm from "@/utils/auth";

const EditStudent = () => {
  const router = useRouter();
  const { id } = useParams();

  const [student, setStudent] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    class: "",
    grade: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`/api/students/${id}`);

        setStudent(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const validateStudentForm = () => {
    const newErrors = validateForm(student);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = async (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setLoading(true);

      const image = await imageUpload(e.target.files[0]);

      setStudent({
        ...student,
        image,
      });

      setLoading(false);
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
      await axios.put(`/api/students/${id}`, student);

      alert("Student Updated Successfully");

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Student</h2>

      <form onSubmit={handleSubmit} className="card p-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Name</label>
            <input
              name="name"
              value={student.name}
              onChange={handleChange}
              className="form-control mb-2"
            />
            {errors.name && (
              <span className="text-danger small d-block mt-1">
                {errors.name}
              </span>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label>Phone</label>
            <input
              name="phone"
              value={student.phone}
              onChange={handleChange}
              className="form-control mb-2"
            />
            {errors.phone && (
              <span className="text-danger small d-block mt-1">
                {errors.phone}
              </span>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              name="email"
              value={student.email}
              onChange={handleChange}
              className="form-control mb-2"
            />
            {errors.email && (
              <span className="text-danger small d-block mt-1">
                {errors.email}
              </span>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label>Age</label>
            <input
              name="age"
              value={student.age}
              onChange={handleChange}
              className="form-control mb-2"
            />
            {errors.age && (
              <span className="text-danger small d-block mt-1">
                {errors.age}
              </span>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label>Class</label>
            <input
              name="class"
              value={student.class}
              onChange={handleChange}
              className="form-control mb-2"
            />
            {errors.class && (
              <span className="text-danger small d-block mt-1">
                {errors.class}
              </span>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label>Grade</label>
            <input
              name="grade"
              value={student.grade}
              onChange={handleChange}
              className="form-control mb-2"
            />
            {errors.grade && (
              <span className="text-danger small d-block mt-1">
                {errors.grade}
              </span>
            )}
          </div>

          <div className="col-md-12 mb-3">
            <label>Image URL</label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.image && (
              <span className="text-danger small d-block mt-1">
                {errors.image}
              </span>
            )}
          </div>

          {student.image && (
            <img
              src={student.image}
              alt="Student"
              width={180}
              className="mb-3 rounded"
            />
          )}

          <button className="btn btn-success" disabled={loading}>
            {loading ? "Uploading..." : "Update Student"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
