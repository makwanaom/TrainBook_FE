import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Train Booking</h1>
        <div>
          <Link to="/" className="px-4 py-2 hover:underline">Home</Link>
          <Link to="/signup" className="px-4 py-2 hover:underline">Signup</Link>
          <Link to="/login" className="px-4 py-2 hover:underline">Login</Link>
       

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
