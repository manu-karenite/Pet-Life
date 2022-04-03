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
export {
  getHotels,
  getIndividualHotel,
  getMoreHotelDetails,
  updatePetDetails,
  getPetDetails,
};
