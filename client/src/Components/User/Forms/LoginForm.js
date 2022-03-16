import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../Axios/User/Authentication.js";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./LoginForm.module.css";
const LoginForm = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const loginHandler = (e) => {
    console.log(data);
    loginUser(data)
      .then((res) => {
        if (window !== undefined) {
          window.localStorage.setItem("UserLoggedIn", JSON.stringify(res.data));
        }
        toast.success("Login Successfull!");
        navigate("/dashboard");
      })
      .catch((err) => toast.error(err.response.data));
  };
  return (
    <center>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <div className={styles.formTitle}>Sign In</div>
          <div className={styles.formTooltip}>Welcome Back</div>
          <div className={styles.formFields}>
            <input
              type="text"
              className={styles.input}
              placeholder="Email or Phone Number"
              value={data.username || ""}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Enter Password"
              value={data.password || ""}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <div
              className={styles.forgotPassword}
              onClick={(e) => navigate("/forgot-password")}
            >
              Forgot Password?
            </div>
            <button
              className={styles.formBtn}
              disabled={!data.username || !data.password}
              onClick={loginHandler}
            >
              Login
            </button>
            <div className={styles.tootlip}>
              New Here?{" "}
              <span onClick={(e) => navigate("/register")}>Join Us</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.vectorList}>
        <img
          src="https://res.cloudinary.com/pet-life/image/upload/v1647343628/Vectors/Vector_1_zd9ug9.svg"
          alt="hello"
          className={styles.image1}
        />
        <img
          src="https://res.cloudinary.com/pet-life/image/upload/v1647343628/Vectors/Vector_kck1ck.svg"
          alt="vector"
          className={styles.image2}
        />
      </div>
    </center>
  );
};

export default LoginForm;
