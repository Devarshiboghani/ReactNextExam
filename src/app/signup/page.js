"use client";

import { signUp } from "@/redux/actions/authAction";
import { imageUpload } from "@/services/uploadImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./signup.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, isError, isCreate } = useSelector(
    (state) => state.authStore,
  );

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChanged = async (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      if (!e.target.files[0]) return;
      setUploading(true);
      try {
        const imagePath = await imageUpload(e.target.files[0]);
        setFormData((prev) => ({
          ...prev,
          profileImage: imagePath,
        }));
      } catch (error) {
        console.error("Image upload failed:", error);
      }
      setUploading(false);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (formError) setFormError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFormError("Password and confirm password do not match");
      return;
    }

    dispatch(signUp(formData));
  };

  useEffect(() => {
    if (isCreate) router.push("/signin");
  }, [isCreate, router]);

  if (isLoading) {
    return (
      <div className="signup-container">
        <h2>Creating account...</h2>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account 🚀</h2>
        <p className="signup-subtitle">Join BlogHub and start your journey</p>
        {isError && <p className="error-msg">{isError}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChanged}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChanged}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChanged}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChanged}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChanged}
              required
            />
          </div>

          <div className="form-group">
            <label>Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={handleChanged}
              accept="image/*"
              required
            />
          </div>

          <button type="submit" className="signup-btn" disabled={uploading}>
            {uploading ? "Uploading..." : "Create Account"}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link href="/signin">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
