const Navbar =  ({navigate}) => {
return(
<div className="navbar">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/About")}>About</button>
      </div>
)
}
export default Navbar