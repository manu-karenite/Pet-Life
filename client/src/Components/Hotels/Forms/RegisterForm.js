import React from "react";

import styles from "./RegisterForm.module.css";
const RegisterForm = () => {
  const [data, setData] = React.useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    //data contains the data to be used for registration
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
        <button type="submit" className={styles.regBtn}>
          Register
        </button>
      </center>
    </form>
  );
};

export default RegisterForm;
