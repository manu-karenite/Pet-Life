import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../../../Axios/User/Authentication.js";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  //declaring react functions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(data)
      .then((res) => {
        //prepare to send it to Local Storage
        if (window !== "undefined") {
          window.localStorage.setItem(
            "verification",
            JSON.stringify({
              email: data.email,
              name: data.name,
            })
          );
        }
        dispatch({
          type: "VERIFICATION",
          payload: {
            email: data.email,
            name: data.name,
          },
        });
        toast.success("Email has been sent to your email for further steps!");
      })
      .catch((err) => toast.error(err.response.data));
  };
  return (
    <center>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <div className={styles.formTitle}>Sign Up</div>
          <div className={styles.formTooltip}>
            Sign Up to Manage your Accounts and Book Hotels
          </div>
          <div className={styles.formFields}>
            <input
              type="text"
              className={styles.input}
              placeholder="Name"
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />

            <input
              type="email"
              className={styles.input}
              placeholder="Email Address"
              value={data.email || ""}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <br />

            <button
              className={styles.formBtn}
              disabled={!data.name || !data.email}
              onClick={submitHandler}
            >
              Register
            </button>
          </div>
          <div className={styles.tootlip}>
            Already Registered ?{" "}
            <span onClick={(e) => navigate("/login")}>Login Here</span>
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

export default RegisterForm;
