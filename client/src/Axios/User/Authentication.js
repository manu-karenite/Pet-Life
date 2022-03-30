import axios from "axios";
import {useDispatch} from "react-redux";

const registerUser = async (data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/register-user`,
    data: data,
  });
  return result;
};
const registerUserConfirm = async (data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/register-user/confirm`,
    data: data,
  });

  return result;
};
const loginUser = async (data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/login`,
    data: data,
  });
  return result;
};
const verifyUser = async (obj) => {
  console.log("HELLO");
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/verify-user`,
    params: { email: obj.email },
    headers: {
      authorization: `Bearer ${obj.jwt}`,
    },
  });
  return result;
};
const forgotPassword = async (email) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/forgot-password`,
    data: {
      email: email,
    },
  });
  return result;
};
const verifyOTP = async (otp, email) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/verify-otp`,
    data: {
      email: email,
      otp: otp,
    },
  });
  return result;
};
const updatePassword = async (pass, confirmpass, email) => {
  const result = await axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_BACKEND_URL}/update-password`,
    data: {
      pass: pass,
      confirmpass: confirmpass,
      email: email,
    },
  });
  return result;
};
const ProfileUpdatePassword = async (pass, confirmpass, email) => {
  const result = await axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_BACKEND_URL}/updatepassword`,
    data: {
      pass: pass,
      confirmpass: confirmpass,
      email: email,
    },
  });
  return result;
};
const SendMessage = async (name, email, msg) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/contact`,
    data: {
      name: name,
      email: email,
      msg: msg,
    },
  });
  return result;
};

const FetchHotels = async (name, email, msg) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/menu`,
    data: {
      name: name,
    },
  });
  return result;
};

const getDetails = async (id) => {
  console.log(id)
  
  const result = await axios({
    
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/presentation`,
    data: {
      id: id,
    },
  });
  return result;
};

export { registerUser, registerUserConfirm, loginUser, verifyUser, forgotPassword, verifyOTP, updatePassword, ProfileUpdatePassword, SendMessage, FetchHotels, getDetails };
