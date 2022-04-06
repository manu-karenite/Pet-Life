import React from "react";
import { useNavigate, Link } from "react-router-dom";
const AdminHeader = () => {
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    if (window !== "undefined" && window.localStorage.getItem("admin")) {
      window.localStorage.removeItem("admin");
    }
    navigate("/admin/login");
  };
  return (
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      style={{ marginBottom: "20px" }}
    >
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item active">
              <Link to="/admin/home">
                <a class="nav-link" href="/admin/home">
                  Home
                </a>
              </Link>
            </li>

            <li class="nav-item">
              <a class="nav-link" onClick={logoutHandler}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
