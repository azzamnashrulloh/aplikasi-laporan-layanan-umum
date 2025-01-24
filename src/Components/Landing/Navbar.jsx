import { useLocation } from "react-router-dom";

const Navbar = ({ navigate }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar text-white">
      <a
        className={`nav-btn hover:cursor-pointer ${
          isActive("/") ? "border-b-2 border-white" : ""
        }`}
        onClick={() => navigate("/")}
      >
        Home
      </a>
      <a
        className={`nav-btn hover:cursor-pointer ${
          isActive("/About") ? "border-b-2 border-white" : ""
        }`}
        onClick={() => navigate("/About")}
      >
        About
      </a>
    </div>
  );
};

export default Navbar;
