import React from "react";
import { verifyJWT } from "../../Axios/Admin.js";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AdminProtectRoute = ({ children }) => {
  const [proceed, setProceed] = React.useState(true);
  const navigate = useNavigate();
  let token = "garbageString";
  if (window && window.localStorage.getItem("admin")) {
    token = window.localStorage.getItem("admin");
  } else {
    navigate("/admin/login");
  }

  const checkAdmin = () => {
    verifyJWT(token)
      .then((res) => setProceed(true))
      .catch((err) => {
        setProceed(false);
        toast.error(err.response.data);
        navigate("/admin/login");
      });
  };
  React.useEffect(() => {
    checkAdmin();
  }, []);
  return <>{proceed ? children : <Navigate to="/admin/login" />}</>;
};

export default AdminProtectRoute;
