import axios from "axios";
const getHotels = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/get-hotels`,
  });
  return result;
};
const getIndividualHotel = async (id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/get-hotel-detail/${id}`,
  });
  return result;
};
const getMoreHotelDetails = async (id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/get-more-hotel-details/${id}`,
  });
  return result;
};
const updatePetDetails = async (id, data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/update-pet`,
    headers: {
      authorization: `Bearer ${id}`,
    },
    data: data,
  });
  return result;
};
const createPet = async (id, data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/create-my-pet`,
    headers: {
      authorization: `Bearer ${id}`,
    },
    data: data,
  });
  return result;
};
const deleteMyPet = async (JWT, id) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_URL}/delete-my-pet/${id}`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  });
  return result;
};
const getPetDetails = async (id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/get-my-pet`,
    headers: {
      authorization: `Bearer ${id}`,
    },
  });
  return result;
};
const addReview = async (JWT, data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/add-review`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
    data: data,
  });
  return result;
};
const getReviewsHotelWise = async (hotelId) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/get-all-reviews/${hotelId}`,
  });
  return result;
};
const getUserBookings = async (JWT) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/get-user-bookings`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  });
  return result;
};
export {
  getHotels,
  getIndividualHotel,
  getMoreHotelDetails,
  updatePetDetails,
  createPet,
  deleteMyPet,
  getPetDetails,
  addReview,
  getReviewsHotelWise,
  getUserBookings,
};
