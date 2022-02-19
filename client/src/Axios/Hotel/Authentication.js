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
export { registerHotel, registerHotelConfirm };
