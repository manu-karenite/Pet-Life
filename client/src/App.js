import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//importing only Users Related Pages
import About from "./Pages/User/About.js";
import Contact from "./Pages/User/Contact.js";
import Home from "./Pages/User/Home.js";
import Login from "./Pages/User/Login.js";
import Menu from "./Pages/User/Menu.js";
import SignUp from "./Pages/User/SignUp.js";
import Navbar from "./Components/Users/Navbar.js";
import Footer from "./Components/Users/Footer.js";

//importing only Hotels Routes
import HotelAppBar from "./Components/AppBar/HotelAppBar.js";
import RegisterHotel from "./Pages/Hotels/Register.js";
import HotelLogin from "./Pages/Hotels/Login.js";
import RegisterConfirmHotel from "./Pages/Hotels/RegisterConfirm.js";
function App() {
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
          path="/signup"
          exact
          element={
            <>
              <Navbar />
              <SignUp />
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
      </Routes>
    </>
  );
}

export default App;
