import axios from "axios";

const registerHotel = async (data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/register-hotel`,
    data: data,
  });
  return result;
};
const registerHotelConfirm = async (data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/register-hotel/confirm`,
    data: data,
  });
  return result; 
};
const loginHotel = async (data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/login`,
    data: data,
  });
  return result;
};
const verifyHotel = async (obj) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/verify-hotel`,
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
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/forgot-password`,
    data: {
      email: email,
    },
  });
  return result;
};
const verifyOTP = async (otp, email) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/verify-otp`,
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
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/update-password`,
    data: {
      pass: pass,
      confirmpass: confirmpass,
      email: email,
    },
  });
  return result;
};
export {
  registerHotel,
  registerHotelConfirm,
  loginHotel,
  verifyHotel,
  forgotPassword,
  verifyOTP,
  updatePassword,
};
