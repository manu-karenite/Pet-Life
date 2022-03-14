import axios from "axios";

const createCoupon = async (jwt, email, data) => {
  const obj = { ...data, email: email };
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/create-coupon`,
    data: obj,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};

const getCoupons = async (jwt) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/coupons`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const deleteCoupon = async (jwt, id) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/coupon/delete`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};

//FOR PROFILE
const getProfile = async (jwt, id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/profile`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};
const updateProfile = async (jwt, object) => {
  const result = await axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/update-profile`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: object,
  });
  return result;
};

const uploadImage = async (jwt, binaryImg) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/add-image`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: {
      binaryImg: binaryImg,
    },
  });
  return result;
};
const getImages = async (jwt) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/get-images`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
export {
  createCoupon,
  getCoupons,
  deleteCoupon,
  getProfile,
  updateProfile,
  uploadImage,
  getImages,
};
