import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import "../../assets/css/landing.css";
import Navbar from "../../Components/Landing/Navbar";
const LandingMaster = () => {
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <Navbar navigate={navigate} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};
export default LandingMaster;
