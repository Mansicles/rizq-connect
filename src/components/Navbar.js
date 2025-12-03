import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white p-4 text-emerald-700 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Rizq Connect</Link>
        </div>
        <div className="space-x-6 text-lg">
          <Link to="/" className="hover:text-emerald-500 transition duration-300">
            Home
          </Link>
          <Link to="/donate" className="hover:text-emerald-500 transition duration-300">
            Donate
          </Link>
          <Link to="/volunteer" className="hover:text-emerald-500 transition duration-300">
            Volunteer
          </Link>
          <Link to="/about" className="hover:text-emerald-500 transition duration-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-emerald-500 transition duration-300">
            Contact
          </Link>
          <Link to="/dashboard" className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
