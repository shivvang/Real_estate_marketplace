import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
function NavBar() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          Housing<span className="text-gray-400">.Com</span>
        </Link>

        <form className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-800 text-white"
          />
          <button className="bg-blue-600 px-4 py-2 rounded-r-lg flex items-center">
            <FaSearch className="text-white text-lg" />
          </button>
        </form>
        <ul className="flex gap-6">
          <li className="text-sm">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
          </li>
          <li className="text-sm">
            <Link to="/about" className="hover:text-blue-500">
              About
            </Link>
          </li>
          <li className="text-sm">
            <Link to="/signin" className="hover:text-blue-500">
              Sign in
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default NavBar;
