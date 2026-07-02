"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Container, Navbar, NavDropdown, Image, Button } from "react-bootstrap";
import { FaPenNib, FaSearch } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "@/context/SearchContext";
import "./Navbar.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user: authUser } = useSelector((state) => state.authStore);
  const { search, setSearch, setSearchText } = useContext(SearchContext);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(authUser || null);
      }
      return;
    }

    setUser(authUser || null);
  }, [authUser]);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("user");
    setUser(null);
    router.replace("/signin");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (setSearchText) {
      setSearchText(search.trim());
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar" sticky="top">
      <Container className="navbar-container">
        <Navbar.Brand as={Link} href="/" className="logo">
          <FaPenNib className="logo-icon" />
          <span>ClassRoom</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="border-0 shadow-none"
        />

        <Navbar.Collapse id="navbar-nav">
          <div className="nav-actions ms-auto">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search students..."
                className="search-input"
                value={search || ""}
                onChange={(e) => setSearch && setSearch(e.target.value)}
              />
              <Button type="submit" className="search-btn" variant="light">
                <FaSearch />
              </Button>
            </form>

            {user ? (
              <>
                <Link href="/add-student">
                  <Button className="login-btn">Add Student</Button>
                </Link>

                <NavDropdown
                  title={
                    <Image
                      src={user?.profileImage || "/user.png"}
                      roundedCircle
                      width={42}
                      height={42}
                      alt="Profile"
                    />
                  }
                  align="end"
                >
                  <NavDropdown.Item
                    as={Link}
                    href="/dashboard"
                    className="admin-dropdown-item"
                  >
                    <MdOutlineDashboardCustomize
                      style={{ marginRight: "8px", fontSize: "18px" }}
                    />
                    Dashboard
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item as={Link} href="/profile">
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item
                    className="text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Link href="/signin" className="btn btn-outline-light">
                Login
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
