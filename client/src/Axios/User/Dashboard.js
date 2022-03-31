import axios from "axios";
const getHotels = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/get-hotels`,
  });
  return result;
};
export { getHotels };
