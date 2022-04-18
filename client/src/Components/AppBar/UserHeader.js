import React from "react";
import styles from "./UserHeader.module.css";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const UserHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch({
      type: "USER",
      payload: null,
    });
    if (window !== "undefined" && window.localStorage.getItem("UserLoggedIn")) {
      window.localStorage.removeItem("UserLoggedIn");
    }
    toast.success("Logged out Successfully");
    navigate("/login");
  };
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className={styles.outer}>
      <div className={styles.desktopHeader}>
        <div className={styles.outer1}>
          <div className={styles.outer2}>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/techbuy/image/upload/v1649527754/paws_sluxha.svg"
                alt="snbsj"
                style={{
                  height: "65px",
                  width: "65px",
                  objectFit: "cover",
                  margin: "5px",
                  marginLeft: "30px",
                }}
              />
            </Link>
          </div>
          <div className={styles.outer3}>
            {!user && (
              <Link to="/">
                <div className={styles.links}>
                  <HomeIcon />
                  Home
                </div>
              </Link>
            )}
            <Link to="/menu">
              <div className={styles.links}>
                <ListAltIcon />
                Hotels
              </div>
            </Link>
            {user && (
              <Link to="/dashboard">
                <div className={styles.links}>
                  <DashboardIcon />
                  Dashboard
                </div>
              </Link>
            )}
            {user && (
              <Link to="/dashboard/my-profile">
                <div className={styles.links}>
                  <PersonIcon />
                  Profile
                </div>
              </Link>
            )}
            {user && (
              <div
                className={styles.links}
                onClick={logoutHandler}
                style={{ cursor: "pointer" }}
              >
                <LogoutIcon />
                Logout
              </div>
            )}

            {!user && (
              <Link to="/login">
                <div className={styles.links}>
                  <LoginIcon />
                  Login
                </div>
              </Link>
            )}
            {!user && (
              <Link to="/about">
                <div className={styles.links}>
                  <InfoIcon />
                  About Us
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className={styles.mobileHeader}>
        <div className={styles.outer4}>
          {user && (
            <Link to="/dashboard">
              <div className={styles.links}>
                <DashboardIcon />
                Dashboard
              </div>
            </Link>
          )}
          <Link to="/menu">
            <div className={styles.links}>
              <ListAltIcon />
              Hotels
            </div>
          </Link>
          <div className={styles.outer2}>
            <img
              src="https://res.cloudinary.com/techbuy/image/upload/v1649527754/paws_sluxha.svg"
              alt="snbsj"
              style={{ height: "65px", width: "65px", objectFit: "cover" }}
            />
          </div>
          {user && (
            <Link to="/dashboard/my-profile">
              <div className={styles.links}>
                <PersonIcon />
                Profile
              </div>
            </Link>
          )}
          {!user && (
            <Link to="/login">
              <div className={styles.links}>
                <LoginIcon />
                Login
              </div>
            </Link>
          )}
          {user && (
            <div
              className={styles.links}
              onClick={logoutHandler}
              style={{ cursor: "pointer" }}
            >
              <LogoutIcon />
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
