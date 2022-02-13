import axios from "axios";

const registerHotel = async (data) => {
  console.log(`${process.env.REACT_APP_BACKEND_URL}/hotel/register-hotel`);
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/hotel/register-hotel`,
    data: data,
  });
  return result;
};
export { registerHotel };
