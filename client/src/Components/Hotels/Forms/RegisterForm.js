import React from "react";

import styles from "./RegisterForm.module.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerHotel } from "../../../Axios/Hotel/Authentication.js";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import "./LoginForm.css";
const RegisterForm = () => {
  //declaring react functions
  const dispatch = useDispatch();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!data?.name) {
      toast.warning("Please Enter Hotel Name");
      return;
    }
    if (!data?.email) {
      toast.warning("Please Enter Hotel Email Address");
      return;
    }
    if (data?.email.includes("@") === false) {
      toast.warning("Please Enter Valid Email Address");
      return;
    }
    console.log(data.contact.length);
    if (data?.contact === "") {
      toast.warning("Please Enter 10 Digit Contact Number");
      return;
    }
    if (data.contact.length !== 10) {
      toast.warning("Please Enter 10 Digit Contact Number");
      return;
    }
    if (!data?.owner) {
      toast.warning("Please Enter Hotel Owner's Name");
      return;
    }

    setLoading(true);
    registerHotel(data)
      .then((res) => {
        //prepare to send it to Local Storage
        if (window !== "undefined") {
          window.localStorage.setItem(
            "verification",
            JSON.stringify({
              email: data.email,
              name: data.name,
              owner: data.owner,
              phone: data.contact,
            })
          );
        }
        dispatch({
          type: "VERIFICATION",
          payload: {
            email: data.email,
            name: data.name,
            owner: data.owner,
            phone: data.contact,
          },
        });
        toast.success("Email has been sent to your email for further steps!");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
  };
  return (
    <>
      <div class="dummy">
        <div class="dummy-node">Join Us</div>
        <form autoComplete="off">
          <input
            name={nanoid()}
            id={nanoid()}
            type="text"
            class="feedback-input"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Enter Name of Hotel"
            autoComplete={nanoid()}
            required={true}
          />
          <input
            name={nanoid()}
            id={nanoid()}
            type="email"
            class="feedback-input"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Enter Business Email of Hotel"
            autoComplete={nanoid()}
            required={true}
          />
          <input
            name={nanoid()}
            id={nanoid()}
            type="number"
            class="feedback-input"
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
            placeholder="Enter Business Contact of Hotel"
            autoComplete={nanoid()}
            required={true}
            minLength={10}
            maxLength={10}
          />
          <input
            name={nanoid()}
            type="text"
            class="feedback-input"
            placeholder="Enter Owner's Name"
            value={data.owner}
            autoComplete={nanoid()}
            id={nanoid()}
            onChange={(e) => setData({ ...data, owner: e.target.value })}
            required={true}
          />

          <input
            type="submit"
            value={loading ? "Please Wait" : "Register"}
            onClick={submitHandler}
          />
        </form>
        <Link to="/hotel/login">
          <div class="dummy-node1">Already Registered?</div>
        </Link>
        <Link to="/login">
          <div class="dummy-node1">Explore as User</div>
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
