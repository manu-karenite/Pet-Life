import axios from "axios";

//FOR PROFILE
const getUserProfile = async (jwt, id) => {
  console.log(id);
  const result = await axios({ 
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/profile`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};
const updateUserProfile = async (jwt, object) => {
  const userId=JSON.parse(localStorage.getItem("UserLoggedIn"))._id;
  const result = await axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_BACKEND_URL}/update-profile`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: {...object,userId},
  });
  return result;
};
export { getUserProfile, updateUserProfile };
