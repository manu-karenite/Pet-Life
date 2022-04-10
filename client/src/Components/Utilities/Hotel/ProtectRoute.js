import React, { useEffect, useState } from "react";
import { verifyHotel } from "../../../Axios/Hotel/Authentication.js";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProtectRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [ok, setOk] = useState(true);
  let hotelLoggedIn = null;
  if (window !== "undefined" && window.localStorage.getItem("hotelLoggedIn")) {
    hotelLoggedIn = JSON.parse(window.localStorage.getItem("hotelLoggedIn"));
  }
  console.log(hotelLoggedIn);
  const validate = (hotelLoggedIn) => {
    if (!hotelLoggedIn) {
      setOk(false);
    }
    verifyHotel(hotelLoggedIn)
      .then((res) => {
        dispatch({
          type: "HOTEL",
          payload: hotelLoggedIn,
        });
        setOk(true);
      })
      .catch((err) => {
        setOk(false);
        navigate("/hotel/login");
      });
  };

  useEffect(() => {
    validate(hotelLoggedIn);
  }, []);
  return <>{ok ? children : <Navigate to="/hotel/login" />}</>;
};

export default ProtectRoute;
