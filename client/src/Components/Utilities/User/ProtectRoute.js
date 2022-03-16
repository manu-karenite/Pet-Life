import React, { useEffect, useState } from "react";
import { verifyUser } from "../../../Axios/User/Authentication.js";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProtectRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [ok, setOk] = useState(true);
  let UserLoggedIn = null;
  if (window !== "undefined" && window.localStorage.getItem("UserLoggedIn")) {
    UserLoggedIn = JSON.parse(window.localStorage.getItem("UserLoggedIn"));
  }
  console.log(UserLoggedIn);
  const validate = (UserLoggedIn) => {
    if (!UserLoggedIn) {
      setOk(false);
    }
    verifyUser(UserLoggedIn)
      .then((res) => {
        dispatch({
          type: "USER",
          payload: UserLoggedIn,
        });
        setOk(true);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    validate(UserLoggedIn);
  }, []);
  return <>{ok ? children : <Navigate to="/login" />}</>;
};

export default ProtectRoute;
