import axios from "axios";
const createCheckout = async (data, jwt) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/create-checkout`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const getSavedItem = async (jwt) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/get-saved-item`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const createBooking = async (jwt, data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/create-booking`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const checkCoupon = async (JWT, data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/check-coupon`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
    data: data,
  });
  return result;
};
export { createCheckout, getSavedItem, createBooking, checkCoupon };
