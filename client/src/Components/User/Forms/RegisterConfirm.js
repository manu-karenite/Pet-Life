import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUserConfirm } from "../../../Axios/User/Authentication.js";
import { toast } from "react-toastify";
import styles from "./LoginForm.module.css";
import { AppstoreOutlined } from "@ant-design/icons";
const RegisterConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = React.useState(false);
  let verificationParameter = null;
  const setRedux = () => {
    if (window !== "undefined" && window.localStorage.getItem("verification")) {
      verificationParameter = JSON.parse(
        window.localStorage.getItem("verification")
      );
    }
    dispatch({
      type: "VERIFICATION",
      payload: verificationParameter,
    });
  };
  React.useEffect(() => {
    setRedux();
  }, []);
  const { verification } = useSelector((state) => ({ ...state }));
  const [data, setData] = React.useState({ checked: false });

  const confirmRegistration = (e) => {
    if (!verification || !verification.email || !verification.name) {
      toast.warning("No Email or Name Found! Redirecting Back to Login Page");
      navigate("/login");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords Don't Match");
      return;
    }
    e.preventDefault();
    setLoading(true);
    const mainObj = { ...data, ...verification, jwt: params.jwt };
    registerUserConfirm(mainObj)
      .then((res) => {
        toast.success(
          "Congratulations! 🎉 You have been successfully registered! Please Login to Continue"
        );
        dispatch({
          type: "VERIFICATION",
          payload: null,
        });
        window?.localStorage?.removeItem("verification");
        navigate("/login");
        setLoading(false);
      })

      .catch((err) => {
        toast.error("Unknown Error Occurred! ", err.response.data);
        setLoading(false);
      });
  };
  return (
    <center>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <div className={styles.formTitle}>One Last Step!</div>
          <div className={styles.formTooltip}>Finish Registration</div>
          <div className={styles.formFields}>
            <input
              type="email"
              className={styles.input}
              placeholder="Email address"
              required={true}
              readOnly={true}
              value={verification?.name}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Enter Password"
              required={true}
              readOnly={true}
              value={verification?.email}
            />

            <input
              type="password"
              className={styles.input}
              placeholder="Enter Password"
              required={true}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              value={data.password}
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Enter Password"
              required={true}
              onChange={(e) =>
                setData({
                  ...data,
                  confirmPassword: e.target.value,
                })
              }
              value={data.confirmPassword}
            />

            <button
              className={styles.formBtn}
              disabled={loading}
              onClick={confirmRegistration}
            >
              {!loading ? (
                "Finish Registration"
              ) : (
                <AppstoreOutlined style={{ fontSize: 30 }} spin={true} />
              )}
            </button>
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

export default RegisterConfirm;
