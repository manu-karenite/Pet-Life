import React from "react";
import styles from "../../../Styles/UserPages/DeleteProfile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteProfile } from "../../../Axios/User/Authentication.js";
import { useNavigate } from "react-router-dom";
const MyDeleteProfile = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [pass, setPass] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteHandler = () => {
    if (!pass) {
      toast.warning("Please Enter your Password to Delete Your Account!");
      return;
    }
    const ans = window.confirm(
      "Are you sure, you want to delete your account? This action cannot be undone! ☹️"
    );
    if (ans) {
      deleteProfile(user?.jwt, user?._id)
        .then((res) => {
          toast("Profile Deleted!");
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
        .catch((err) => "Something Happened! Please try again later");
    }
  };
  return (
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
        <button onClick={deleteHandler}>Delete Account</button>
      </div>
    </div>
  );
};

export default MyDeleteProfile;
