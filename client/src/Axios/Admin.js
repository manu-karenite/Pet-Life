import axios from "axios";

const loginAdmin = async (data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/login`,
    data: data,
  });
  return result;
};
const verifyJWT = async (JWT) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/verify-jwt`,
    data: { JWT: JWT },
  });
  return result;
};
const getAllPets = async (JWT) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-pets`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  });
  return result;
};
const getPetById = async (JWT, petId) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-pet/${petId}`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  });
  return result;
};
const getAllUsers = async (JWT) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-users`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  });
  return result;
};
const changeStatus = async (status, hotelId, JWT) => {
  const result = await axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/change-status/${hotelId}`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
    data: { status: status },
  });
  return result;
};
const getAllHotels = async (JWT) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-hotels`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  });
  return result;
};
const getHotelById = async (JWT, id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-hotel/${id}`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  });
  return result;
};
const getAllBookings = async (JWT) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-bookings`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  });
  return result;
};
const getBookingById = async (JWT, bookingId) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-booking/${bookingId}`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  });
  return result;
};
const deleteService = async (JWT, hotelId, serviceId) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/delete-service/${hotelId}/${serviceId}`,
    headers: {
      authorization: `Bearer ${JWT}`,
    },
  });
  return result;
};
export {
  loginAdmin,
  verifyJWT,
  getAllPets,
  getPetById,
  getAllUsers,
  changeStatus,
  getAllHotels,
  getHotelById,
  getAllBookings,
  getBookingById,
  deleteService,
};
