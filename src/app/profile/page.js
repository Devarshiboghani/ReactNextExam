"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/reducers/authReducer";
import "./profile.css";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));

    if (!currentUser) {
      router.push("/signin");
    } else {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    dispatch(logout());

    router.replace("/");
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={user.profileImage || "/user.png"}
            alt="Profile"
            className="profile-image"
          />

          <h2>
            {user.firstname} {user.lastname}
          </h2>

          <p>{user.email}</p>
        </div>

        <div className="profile-info">
          <div className="info-box">
            <span>First Name</span>
            <h4>{user.firstname}</h4>
          </div>

          <div className="info-box">
            <span>Last Name</span>
            <h4>{user.lastname}</h4>
          </div>

          <div className="info-box">
            <span>Email</span>
            <h4>{user.email}</h4>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
