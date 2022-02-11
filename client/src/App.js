import "./App.css";
import { Routes, Route } from "react-router-dom";

//importing only Hotels Routes
import RegisterHotel from "./Pages/Hotels/Register.js";
function App() {
  return (
    <Routes>
      {/*Routes for Hotels Only*/}
      <Route path="/hotel/register" exact element={<RegisterHotel />} />
    </Routes>
  );
}

export default App;
