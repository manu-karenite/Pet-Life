import React from "react";
import { nanoid } from "nanoid";
import { useNavigate, Link } from "react-router-dom";
import { loginHotel } from "../../../Axios/Hotel/Authentication.js";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./LoginForm.css";
const LoginForm = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(loading);
    loginHotel(data)
      .then((res) => {
        if (window !== undefined) {
          window.localStorage.setItem(
            "hotelLoggedIn",
            JSON.stringify(res.data)
          );
        }
        toast.success("Login Success!");
        setLoading(false);
        navigate("/hotel/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
  };
  return (
    <div class="dummy">
      <div class="dummy-node">Welcome Back To Hotel Panel</div>
      <form autoComplete="off">
        <input
          name={nanoid()}
          id={nanoid()}
          type="email"
          class="feedback-input"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          placeholder="Enter Email of Hotel"
          autoComplete={nanoid()}
        />
        <input
          name={nanoid()}
          type="password"
          class="feedback-input"
          placeholder="Password"
          value={data.password}
          autoComplete={nanoid()}
          id={nanoid()}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <input
          type="submit"
          value={loading ? "Logging In....." : "Login"}
          onClick={loginHandler}
          disabled={loading}
        />
      </form>
      <Link to="/hotel/forgot-password">
        <div class="dummy-node1">Forgot Password?</div>
      </Link>
      <Link to="/hotel/register">
        <div class="dummy-node1">Join Us</div>
      </Link>
    </div>
  );
};

export default LoginForm;
