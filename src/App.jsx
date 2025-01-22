import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
import LandingMaster from "./Page/Landing/LandingMaster";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LandingMaster />} />
      </Routes>
    </Router>
  );
};

export default App;
