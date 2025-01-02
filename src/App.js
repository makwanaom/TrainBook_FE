import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<Home />} />
        
      </Routes>
    </Router>
  );
};

export default App;
