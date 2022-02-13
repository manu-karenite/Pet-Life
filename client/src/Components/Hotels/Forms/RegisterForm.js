import React from "react";

import styles from "./RegisterForm.module.css";
import { toast } from "react-toastify";
import { registerHotel } from "../../../Axios/Hotel/Authentication.js";
const RegisterForm = () => {
  const [data, setData] = React.useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    registerHotel(data)
      .then((res) =>
        toast.success("Email has been sent to your email for further steps!")
      )
      .catch((err) => toast.error(err.response.data));
  };
  return (
    <form className={styles.regForm} onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="hotelName">Hotel Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          placeholder="Enter hotel's name"
          required={true}
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <small id="emailHelp" className="form-text text-muted">
          This would be the Name, users will see while Booking!
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address of Hotel</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email for business purpose"
          required={true}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
        />
        <small id="emailHelp" className="form-text text-muted">
          All Orders will be Communicated through this mail.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="hotelPhone">Enter Contact Number</label>
        <input
          type="number"
          className="form-control"
          id="hotelPhone"
          placeholder="Enter Contact Number"
          required={true}
          onChange={(e) => setData({ ...data, contact: e.target.value })}
          value={data.contact}
          minLength={10}
          maxLength={10}
        />
        <small id="emailHelp" className="form-text text-muted">
          Enter your Contact Number without Country's Code, viz. +91
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="ownerName">Hotel Owner's Name</label>
        <input
          type="text"
          className="form-control"
          id="ownerName"
          aria-describedby="emailHelp"
          placeholder="Enter Hotel Owner's Name"
          required={true}
          onChange={(e) => setData({ ...data, owner: e.target.value })}
          value={data.owner}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your data with anyone else.
        </small>
      </div>
      <center>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!data.name || !data.email || !data.contact || !data.owner}
        >
          Register Hotel
        </button>
      </center>
    </form>
  );
};

export default RegisterForm;
