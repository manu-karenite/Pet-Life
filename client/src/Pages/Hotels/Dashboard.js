import React from "react";
import styles from "../../Styles/HotelDashboard.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
const Dashboard = () => {
  const { hotel } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{hotel?.name}</div>
      <div className={styles.status}>
        Status :{" "}
        {hotel?.status === "In-Active" ? (
          <span className={styles.inactive}>In-Active</span>
        ) : hotel?.status === "Queued" ? (
          <span className={styles.queued}>Request In Process</span>
        ) : (
          <span className={styles.active}>Active</span>
        )}
      </div>
      <div className={styles.catalogues}>
        {/* <center> */}
        <div
          className={styles.item}
          onClick={(e) => navigate("/hotel/profile")}
        >
          <div className={styles.item__icon}>
            <AccountCircleOutlinedIcon sx={{ fontSize: 100 }} />
          </div>
          <div className={styles.item__title}>Profile</div>
          <div className={styles.item__preview}>
            View and Update your Profile
          </div>
        </div>
        <div
          className={styles.item}
          onClick={(e) => navigate("/hotel/bookings")}
        >
          <div className={styles.item__icon}>
            <ListAltOutlinedIcon sx={{ fontSize: 100 }} />
          </div>
          <div className={styles.item__title}>Bookings</div>
          <div className={styles.item__preview}>
            Check all Your Bookings Here
          </div>
        </div>
        <div
          className={styles.item}
          onClick={(e) => navigate("/hotel/ratings")}
        >
          <div className={styles.item__icon}>
            <ThumbsUpDownOutlinedIcon sx={{ fontSize: 100 }} />
          </div>
          <div className={styles.item__title}>Ratings & Reviews</div>
          <div className={styles.item__preview}>
            Read Customer Reviews and Ratings
          </div>
        </div>
        <div
          className={styles.item}
          onClick={(e) => navigate("/hotel/coupons")}
        >
          <div className={styles.item__icon}>
            <LocalOfferOutlinedIcon sx={{ fontSize: 100 }} />
          </div>
          <div className={styles.item__title}>Coupons</div>
          <div className={styles.item__preview}>
            Create Coupons for Customers
          </div>
        </div>
        <div
          className={styles.item}
          onClick={(e) => navigate("/hotel/add-images")}
        >
          <div className={styles.item__icon}>
            <AddAPhotoOutlinedIcon sx={{ fontSize: 100 }} />
          </div>
          <div className={styles.item__title}>Add Images</div>
          <div className={styles.item__preview}>Add Images for Hotel</div>
        </div>
        <div
          className={styles.item}
          onClick={(e) => navigate("/hotel/services")}
        >
          <div className={styles.item__icon}>
            <CategoryOutlinedIcon sx={{ fontSize: 100 }} />
          </div>
          <div className={styles.item__title}>Services</div>
          <div className={styles.item__preview}>Add Services for Customers</div>
        </div>
        {/* </center> */}
      </div>
      {hotel?.status !== "Active" && (
        <div className={styles.btn}>
          <button className={styles.butt} disabled={hotel?.status === "Queued"}>
            {hotel?.status === "Queued"
              ? "Submitted for Activation"
              : "Request for Account Activation"}
          </button>
          {hotel?.status === "In-Active"
            ? `Your ${hotel?.name}, will be available for booking, and displayed on the website to users, after you complete your profile successfully, follwed by a verification from Admin Side.`
            : ""}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
