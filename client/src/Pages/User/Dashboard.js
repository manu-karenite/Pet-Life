import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/UserDashboard.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

const UserDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <center>
      <div className={styles.header}><h2><b>Hello Pet Lover....</b></h2></div>
      <div className={styles.catalogues}>
        <div className={styles.item} onClick={(e) => navigate("/profile")}>
          <div className={styles.item__icon}><AccountCircleOutlinedIcon sx={{ fontSize: 100 }} /></div>
          <div className={styles.item__title}>Profile</div>
          <div className={styles.item__preview}>View and Update your Profile</div>
        </div>
      </div>
      <div className={styles.catalogues}>
        <div className={styles.item} onClick={(e) => navigate("/bookings")}>
          <div className={styles.item__icon}><ListAltOutlinedIcon sx={{ fontSize: 100 }} /></div>
          <div className={styles.item__title}>Bookings</div>
          <div className={styles.item__preview}>Check all Your Bookings Here</div>
        </div>
      </div>
      </center>
    </div>
  )
};

export default UserDashboard;
