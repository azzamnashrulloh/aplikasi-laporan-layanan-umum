const Navbar = ({ navigate }) => {
  return (
    <div className="navbar">
      <a className="nav-btn" onClick={() => navigate("/")}>
        Home
      </a>
      <a className="nav-btn" onClick={() => navigate("/About")}>
        About
      </a>
    </div>
  );
};
export default Navbar;
