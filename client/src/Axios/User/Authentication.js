import axios from "axios";

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

const contactUs = async (body) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/contact-us`,
    data: body,
  });
  return result;
};

const changePasswordCreateOTP = async (JWT) => {
  console.log("ahahah");
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/change-password/create-otp`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  });
  return result;
};

const changePasswordVerifyOTP = async (JWT, otp) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/change-password/verify-otp`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
    data: {
      otp: otp,
    },
  });
  return result;
};
const changePasswordSetPassword = async (JWT, p, cp) => {
  const result = await axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_BACKEND_URL}/change-password/set-password`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
    data: {
      pass: p,
      confirmpass: cp,
    },
  });
  return result;
};
const deleteProfile = async (JWT, id, pass) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_URL}/delete-profile/${id}`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
    data: {
      pass: pass,
    },
  });
  return result;
};
export {
  registerUser,
  registerUserConfirm,
  loginUser,
  verifyUser,
  forgotPassword,
  verifyOTP,
  updatePassword,
  contactUs,
  changePasswordCreateOTP,
  changePasswordVerifyOTP,
  changePasswordSetPassword,
  deleteProfile,
};
