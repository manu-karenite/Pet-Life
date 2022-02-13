import "./App.css";
import { Routes, Route } from "react-router-dom";

//importing only Hotels Routes
import HotelAppBar from "./Components/AppBar/HotelAppBar.js";
import RegisterHotel from "./Pages/Hotels/Register.js";
import HotelLogin from "./Pages/Hotels/Login.js";
function App() {
  return (
    <>
      <HotelAppBar />
      <Routes>
        {/*Routes for Hotels Only*/}
        <Route path="/hotel/register" exact element={<RegisterHotel />} />
        <Route path="/hotel/login" exact element={<HotelLogin />} />
      </Routes>
    </>
  );
}

export default App;
