import React from "react";
import styles from "../../Styles/HotelDashboard.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile, changeState } from "../../Axios/Hotel/Dashboard.js";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { hotel } = useSelector((state) => ({ ...state }));
  const [hotel1, setHotel1] = React.useState(null);
  const getData = () => {
    getProfile(hotel?.jwt, hotel?._id)
      .then((res) => {
        console.log(res);
        setHotel1(res.data);
      })
      .catch((err) => {});
  };
  React.useEffect(() => {
    hotel && getData();
  }, [hotel]);
  const changeStatus = (state) => {
    changeState(hotel?.jwt, hotel?._id, state)
      .then((res) => {
        toast.success("Request Succesfully Created!");
        getData();
      })
      .catch((err) => toast.error("Unexpected Error"));
  };
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{hotel1?.name}</div>
      <div className={styles.status}>
        Status :{" "}
        {hotel1?.status === "In-Active" ? (
          <span className={styles.inactive}>In-Active</span>
        ) : hotel1?.status === "Queued" ? (
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
        {/* <div
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
        </div> */}
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
      {hotel1?.status}
      {hotel1?.status === "Active" && (
        <div className={styles.btn}>
          <button
            className={styles.butt}
            onClick={() => changeStatus("In-Active")}
          >
            Request for Account Deactivation
          </button>
          {`Your ${hotel1?.name}, is available for booking, and clicking this button will stop displaying onwebsite to Users. (This Could be done For Maintenance Purposes and in Case of No Vacancy!)`}
        </div>
      )}
      {hotel1?.status === "Queued" && (
        <div className={styles.btn}>
          <button
            className={styles.butt}
            onClick={() => changeStatus("In-Active")}
          >
            Cancel Request
          </button>
          {`Your ${hotel1?.name}, is queued for Acceptance from Admin Side, and clicking this button will cancel the Request.`}
        </div>
      )}

      {hotel1?.status === "In-Active" && (
        <div className={styles.btn}>
          <button
            className={styles.butt}
            onClick={() => changeStatus("Queued")}
          >
            Request for Account Activation
          </button>
          {`Your ${hotel1?.name}, will be available for booking, and displayed on the website to users, after you complete your profile successfully, follwed by a verification from Admin Side.`}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
