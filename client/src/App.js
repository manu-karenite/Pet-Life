import "./App.css";
import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
//importing only Users Related Pages
import About from "./Pages/User/About.js";
import Contact from "./Pages/User/Contact.js";
import Home from "./Pages/User/Home.js";
import Login from "./Pages/User/Login.js";
import Menu from "./Pages/User/Menu.js";
import Register from "./Pages/User/Register.js";
import Navbar from "./Components/User/Navbar.js";
import Footer from "./Components/User/Footer.js";
import UserDashboard from "./Pages/User/Dashboard.js";
import UserProtectRoute from "./Components/Utilities/User/ProtectRoute.js";
import RegisterConfirmUser from "./Pages/User/RegisterConfirm.js";
import UserForgotPassword from "./Pages/User/UserForgotPassword";
import UserUpdatePassword from "./Pages/User/UserUpdatePassword.js";

//importing only Hotels Routes
import HotelAppBar from "./Components/AppBar/HotelAppBar.js";
import RegisterHotel from "./Pages/Hotels/Register.js";
import HotelLogin from "./Pages/Hotels/Login.js";
import RegisterConfirmHotel from "./Pages/Hotels/RegisterConfirm.js";
import HotelDashboard from "./Pages/Hotels/Dashboard.js";
import AddImages from "./Pages/Hotels/AddImages.js";
import Bookings from "./Pages/Hotels/Bookings.js";
import Coupons from "./Pages/Hotels/Coupons.js";
import Profile from "./Pages/Hotels/Profile.js";
import Ratings from "./Pages/Hotels/Ratings.js";
import Services from "./Pages/Hotels/Services.js";
import UpdatePassword from "./Pages/Hotels/UpdatePassword.js";
import ForgotPassword from "./Pages/Hotels/ForgotPassword.js";
import HotelProtectRoute from "./Components/Utilities/Hotel/ProtectRoute.js";

function App() {
  //FIX THE REDUX ON EVERY STAGE
  const dispatch = useDispatch();
  const setRedux = () => {
    let user = null;
    if (window !== "undefined" && window.localStorage.getItem("UserLoggedIn")) {
      user = JSON.parse(window.localStorage.getItem("UserLoggedIn"));
    }
    dispatch({
      type: "USER",
      payload: user,
    });
    let hotel = null;
    if (
      window !== "undefined" &&
      window.localStorage.getItem("hotelLoggedIn")
    ) {
      hotel = JSON.parse(window.localStorage.getItem("hotelLoggedIn"));
    }
    dispatch({
      type: "HOTEL",
      payload: hotel,
    });
  };
  React.useEffect(() => {
    setRedux();
  }, []);
  return (
    <>
      <ToastContainer />

      <Routes>
        {/*FOR USERS ROUTES*/}
        <Route
          path="/"
          exact
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/menu"
          exact
          element={
            <>
              <Navbar />
              <Menu />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          exact
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          exact
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          exact
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          exact
          element={
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="/forgot-password"
          exact
          element={
            <>
              <Navbar />
              <UserForgotPassword />
              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard"
          exact
          element={
            <>
              <Navbar />
              <UserProtectRoute>
                <UserDashboard />
              </UserProtectRoute>
            </>
          }
        />

        <Route
          path="/profile"
          exact
          element={
            <>
              <Navbar />
              <UserProtectRoute>
                <Profile />
              </UserProtectRoute>
            </>
          }
        />

        <Route
          path="/update-password"
          exact
          element={
            <>
              <Navbar />
              <UserProtectRoute>
                <UserUpdatePassword />
              </UserProtectRoute>
            </>
          }
        />

        <Route
          path="/register/confirm/:jwt"
          exact
          element={
            <>
              <Navbar />
              <RegisterConfirmUser />
            </>
          }
        />
        {/*FOR HOTELS ROUTES*/}
        <Route
          path="/hotel/register"
          exact
          element={
            <>
              <HotelAppBar />
              <RegisterHotel />
            </>
          }
        />
        <Route
          path="/hotel/register/confirm/:jwt"
          exact
          element={
            <>
              <HotelAppBar />
              <RegisterConfirmHotel />
            </>
          }
        />
        <Route
          path="/hotel/login"
          exact
          element={
            <>
              <HotelAppBar />
              <HotelLogin />
            </>
          }
        />
        <Route
          path="/hotel/dashboard"
          exact
          element={
            <>
              <HotelAppBar />
              <HotelProtectRoute>
                <HotelDashboard />
              </HotelProtectRoute>
            </>
          }
        />
        <Route
          path="/hotel/profile"
          exact
          element={
            <>
              <HotelAppBar />
              <HotelProtectRoute>
                <Profile />
              </HotelProtectRoute>
            </>
          }
        />
        <Route
          path="/hotel/bookings"
          exact
          element={
            <>
              <HotelAppBar />
              <HotelProtectRoute>
                <Bookings />
              </HotelProtectRoute>
            </>
          }
        />
        <Route
          path="/hotel/ratings"
          exact
          element={
            <>
              <HotelAppBar />
              <HotelProtectRoute>
                <Ratings />
              </HotelProtectRoute>
            </>
          }
        />
        <Route
          path="/hotel/coupons"
          exact
          element={
            <>
              <HotelAppBar />
              <HotelProtectRoute>
                <Coupons />
              </HotelProtectRoute>
            </>
          }
        />
        <Route
          path="/hotel/add-images"
          exact
          element={
            <>
              <HotelAppBar />
              <HotelProtectRoute>
                <AddImages />
              </HotelProtectRoute>
            </>
          }
        />
        <Route
          path="/hotel/services"
          exact
          element={
            <>
              <HotelAppBar />
              <HotelProtectRoute>
                <Services />
              </HotelProtectRoute>
            </>
          }
        />
        <Route
          path="/hotel/update-password"
          exact
          element={
            <>
              <HotelAppBar />
              <HotelProtectRoute>
                <UpdatePassword />
              </HotelProtectRoute>
            </>
          }
        />
        <Route
          path="/hotel/forgot-password"
          exact
          element={
            <>
              <HotelAppBar />
              <ForgotPassword />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
