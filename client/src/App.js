import "./App.css";
import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
//importing only Users Related Pages
import TermsAncConditions from "./Pages/User/TermsAncConditions.js";
import FAQ from "./Pages/User/FAQ.js";
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
import HotelIndividual from "./Pages/User/HotelIndividual.js";
import Checkout from "./Pages/User/Checkout.js";
import YourPet from "./Pages/User/YourPet.js";
import MyBookings from "./Pages/User/Dashboard/MyBookings.js";
import MyPets from "./Pages/User/Dashboard/MyPets.js";
import MyDeleteProfile from "./Pages/User/Dashboard/MyDeleteProfile.js";
import MyProfile from "./Pages/User/Dashboard/MyProfile.js";
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

//for Admin Pages
import AdminHeader from "./Components/AppBar/AdminHeader.js";
import AdminProtectRoute from "./Components/Utilities/AdminProtectRoute.js";
import AdminLogin from "./Pages/Admin/Login.js";
import AdminBookings from "./Pages/Admin/Bookings.js";
import AdminHome from "./Pages/Admin/Home.js";
import AdminHotels from "./Pages/Admin/Hotels.js";
import AdminPets from "./Pages/Admin/Pets.js";
import AdminUsers from "./Pages/Admin/Users.js";
import AdminHotelIndividual from "./Pages/Admin/HotelIndividual.js";
import AdminPetIndividual from "./Pages/Admin/PetIndividual.js";
import AdminBookingIndividual from "./Pages/Admin/BookingIndividual.js";

import UserHeader from "./Components/AppBar/UserHeader.js";
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
              <UserHeader />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/terms-and-conditions"
          exact
          element={
            <>
              <UserHeader />
              <TermsAncConditions />
              <Footer />
            </>
          }
        />
        <Route
          path="/menu"
          exact
          element={
            <>
              <UserHeader />
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
              <UserHeader />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/freqently-asked-questions"
          exact
          element={
            <>
              <UserHeader />
              <FAQ />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          exact
          element={
            <>
              <UserHeader />
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
              <UserHeader />
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
              <UserHeader />
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
              <UserHeader />
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
              <UserHeader />
              <UserProtectRoute>
                <UserDashboard />
                <Footer />
              </UserProtectRoute>
            </>
          }
        />
        <Route
          path="/dashboard/my-bookings"
          exact
          element={
            <>
              <UserHeader />
              <UserProtectRoute>
                <MyBookings />
                <Footer />
              </UserProtectRoute>
            </>
          }
        />
        <Route
          path="/dashboard/my-pets"
          exact
          element={
            <>
              <UserHeader />
              <UserProtectRoute>
                <MyPets />
                <Footer />
              </UserProtectRoute>
            </>
          }
        />
        <Route
          path="/dashboard/my-profile"
          exact
          element={
            <>
              <UserHeader />
              <UserProtectRoute>
                <MyProfile />
                <Footer />
              </UserProtectRoute>
            </>
          }
        />
        <Route
          path="/dashboard/delete-profile"
          exact
          element={
            <>
              <UserHeader />
              <UserProtectRoute>
                <MyDeleteProfile />
                <Footer />
              </UserProtectRoute>
            </>
          }
        />
        <Route
          path="/profile"
          exact
          element={
            <>
              <UserHeader />
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
              <UserHeader />
              <UserProtectRoute>
                <UserUpdatePassword />
                <Footer />
              </UserProtectRoute>
            </>
          }
        />
        <Route
          path="/register/confirm/:jwt"
          exact
          element={
            <>
              <UserHeader />
              <RegisterConfirmUser />
            </>
          }
        />
        <Route
          path="/menu/hotel/:hotelId"
          exact
          element={
            <>
              <UserHeader />
              <HotelIndividual />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          exact
          element={
            <>
              <UserHeader />
              <UserProtectRoute>
                <Checkout />
              </UserProtectRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/your-pet"
          exact
          element={
            <>
              <UserHeader />
              <UserProtectRoute>
                <YourPet />
              </UserProtectRoute>
              <Footer />
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
        {/*FOR ADMIN ROUTES*/}
        <Route
          path="/admin"
          exact
          element={
            <>
              <AdminLogin />
            </>
          }
        />
        <Route
          path="/admin/login"
          exact
          element={
            <>
              <AdminLogin />
            </>
          }
        />
        <Route
          path="/admin/bookings"
          exact
          element={
            <>
              <AdminProtectRoute>
                <AdminHeader />
                <AdminBookings />
              </AdminProtectRoute>
            </>
          }
        />
        <Route
          path="/admin/booking/:bookingId"
          exact
          element={
            <>
              <AdminProtectRoute>
                <AdminHeader />
                <AdminBookingIndividual />
              </AdminProtectRoute>
            </>
          }
        />
        <Route
          path="/admin/home"
          exact
          element={
            <>
              <AdminProtectRoute>
                <AdminHeader />
                <AdminHome />
              </AdminProtectRoute>
            </>
          }
        />
        <Route
          path="/admin/hotels"
          exact
          element={
            <>
              <AdminProtectRoute>
                <AdminHeader />
                <AdminHotels />
              </AdminProtectRoute>
            </>
          }
        />
        <Route
          path="/admin/pets"
          exact
          element={
            <>
              <AdminProtectRoute>
                <AdminHeader />
                <AdminPets />
              </AdminProtectRoute>
            </>
          }
        />
        <Route
          path="/admin/users"
          exact
          element={
            <>
              <AdminProtectRoute>
                <AdminHeader />
                <AdminUsers />
              </AdminProtectRoute>
            </>
          }
        />
        <Route
          path="/admin/hotel/:hotelId"
          exact
          element={
            <>
              <AdminProtectRoute>
                <AdminHeader />
                <AdminHotelIndividual />
              </AdminProtectRoute>
            </>
          }
        />
        <Route
          path="/admin/pet/:petId"
          exact
          element={
            <>
              <AdminProtectRoute>
                <AdminHeader />
                <AdminPetIndividual />
              </AdminProtectRoute>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
