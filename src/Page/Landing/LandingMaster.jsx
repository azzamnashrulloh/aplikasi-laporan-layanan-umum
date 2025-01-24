import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./About";
import Home from "./Home.Jsx";
import "../../assets/css/landing.css";
import Navbar from "../../Components/Landing/Navbar";
import Form from "./Form";
const LandingMaster = () => {
  const navigate = useNavigate();
  return (
    <div className="main-container bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950">
      <Navbar navigate={navigate} />
      <Routes>
        <Route path="/" element={<Home navigate={navigate} />} />
        <Route path="/home" element={<Home navigate={navigate} />} />
        <Route path="/about" element={<About />} />
        <Route path="/form" element={<Form navigate={navigate} />} />
      </Routes>
    </div>
  );
};
export default LandingMaster;
