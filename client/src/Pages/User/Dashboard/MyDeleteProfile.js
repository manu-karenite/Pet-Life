import React from "react";
import styles from "../../../Styles/UserPages/DeleteProfile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteProfile } from "../../../Axios/User/Authentication.js";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
const MyDeleteProfile = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [pass, setPass] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [load, setLoad] = React.useState(false);
  const deleteHandler = () => {
    if (!pass) {
      toast.warning("Please Enter your Password to Delete Your Account!");
      return;
    }
    const ans = window.confirm(
      "Are you sure, you want to delete your account? This action cannot be undone! ☹️"
    );

    if (ans) {
      setLoad(true);
      deleteProfile(user?.jwt, user?._id, pass)
        .then((res) => {
          toast("Profile Deleted!");
          setLoad(false);
          dispatch({
            type: "USER",
            payload: null,
          });
          if (
            window !== "undefined" &&
            window.localStorage.getItem("UserLoggedIn")
          ) {
            window.localStorage.removeItem("UserLoggedIn");
          }
          navigate("/login");
        })
        .catch((err) => {
          setLoad(false);
          toast.error(
            err.response.data
              ? err.response.data
              : "Something Happened! Please try again later"
          );
        });
    }
  };
  return (
    <>
      <Helmet>
        <title>PetLife | Delete Profile</title>
      </Helmet>
      <div className={styles.bg}>
        <div className={styles.formBoundary}>
          <div>
            <h3>Delete Account?</h3>
            <h5>It's sad to see you go! 👋</h5>
          </div>
          <br />
          <div>
            <input
              type="email"
              className={styles.inputfield}
              value={user?.email}
              disabled
            />
          </div>
          <div>
            {" "}
            <input
              type="password"
              className={styles.inputfield}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button onClick={deleteHandler} disabled={load}>
            {load ? <LoadingOutlined /> : "Delete Account"}
          </button>
        </div>
      </div>
    </>
  );
};

export default MyDeleteProfile;
