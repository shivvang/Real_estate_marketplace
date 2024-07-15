import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleFormSubmission = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  //used to keep the search term in sync with the URL query parameter.
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-3xl font-bold tracking-wider">
          Home<span className="text-blue-500">Quest</span>
        </Link>

        <form
          onSubmit={handleFormSubmission}
          className="relative w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Search for properties, locations, and more"
            className="w-full pl-4 pr-12 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaSearch className="text-lg" />
          </button>
        </form>

        <ul className="hidden md:flex items-center gap-6">
          <li className="text-lg">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
          </li>
          <li className="text-lg">
            <Link to="/PropertyList" className="hover:text-blue-500">
              PropertyList
            </Link>
          </li>
          <li className="text-lg">
            <Link to="/profile" className="flex items-center">
              {currentUser ? (
                <img
                  className="rounded-full h-8 w-8 object-cover border-2 border-gray-300"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <span className="hover:text-blue-500">Sign In</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default NavBar;
