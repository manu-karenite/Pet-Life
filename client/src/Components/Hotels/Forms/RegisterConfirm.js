import React from "react";
import styles from "./RegisterForm.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerHotelConfirm } from "../../../Axios/Hotel/Authentication.js";
import { toast } from "react-toastify";
const RegisterConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
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
    e.preventDefault();
    const mainObj = { ...data, ...verification, jwt: params.jwt };
    registerHotelConfirm(mainObj)
      .then((res) => {
        toast.success(
          "Congratulations! You have been successfully registered! Please Login to Continue"
        );
        dispatch({
          type: "VERIFICATION",
          payload: null,
        });
        window?.localStorage?.removeItem("verification");
        navigate("/hotel/login");
      })

      .catch((err) =>
        toast.error("Unknown Error Occurred! ", err.response.data)
      );
  };
  return (
    <form className={styles.regForm} onSubmit={confirmRegistration}>
      <div className="form-group">
        <label htmlFor="hotelName">Hotel Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          placeholder="Enter hotel's name"
          required={true}
          readOnly={true}
          value={verification?.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address of Hotel</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email for business purpose"
          required={true}
          readOnly={true}
          value={verification?.email}
        />
        <small id="emailHelp" className="form-text text-muted">
          This is your email-verified business email, for communication
          purposes.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Choose your Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Choose your Password"
          required={true}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          value={data.password}
        />
        {/* <small id="emailHelp" className="form-text text-muted">
          Enter your Contact Number without Country's Code, viz. +91
        </small> */}
      </div>
      <div className="form-group">
        <label htmlFor="confirmpassword">Confirm your Password</label>
        <input
          type="password"
          className="form-control"
          id="confirmpassword"
          aria-describedby="emailHelp"
          placeholder="Confirm your Password"
          required={true}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
          value={data.confirmPassword}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your data with anyone else.
        </small>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue={data.checked}
          id="defaultCheck1"
          onChange={(e) => setData({ ...data, checked: !data.checked })}
        />
        For registering as our partners in <strong>Pet Life</strong>, you agree
        to all our <Link to="/petlife/hotel/tnc"> Terms & Conditions</Link>.
      </div>

      <center>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            !data.password || !data.confirmPassword || data.checked === false
          }
        >
          Register Hotel
        </button>
      </center>
    </form>
  );
};

export default RegisterConfirm;
