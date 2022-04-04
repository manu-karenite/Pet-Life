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
export { loginAdmin, verifyJWT };
