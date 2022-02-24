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
  console.log("HELLO");
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
export { registerHotel, registerHotelConfirm, loginHotel, verifyHotel };
