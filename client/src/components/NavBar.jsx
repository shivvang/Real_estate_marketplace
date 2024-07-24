import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useMemo } from "react";

const NavBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  const getRoleText = useMemo(() => {
    if (currentUser.role === "tenant") return "Looking for rental properties?";
    if (currentUser.role === "buyer") return "Looking to buy?";
    return "";
  }, [currentUser.role]);

  if (!currentUser) {
    return null;
  }

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6 space-y-4 md:space-y-0">
        <Link
          to="/"
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wider"
        >
          Home<span className="text-blue-500">Quest</span>
        </Link>

        <form
          onSubmit={handleFormSubmission}
          className="relative flex items-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        >
          <input
            type="text"
            placeholder="Search by location, title, or price"
            className="flex-grow px-3 py-1 text-xs sm:text-sm md:text-base lg:text-lg rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-blue-600 p-1.5 sm:p-2 rounded-full text-white text-xs sm:text-sm md:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaSearch className="text-xs sm:text-sm md:text-base" />
          </button>
        </form>

        <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          {currentUser.role === "seller" && (
            <li className="text-xs sm:text-sm md:text-base lg:text-lg">
              <Link to="/PropertyList" className="hover:text-blue-500">
                My Property Ads
              </Link>
            </li>
          )}
          <li className="text-xs sm:text-sm md:text-base lg:text-lg">
            <Link to="/search" className="flex items-center">
              <span className="ml-2 whitespace-nowrap">{getRoleText}</span>
            </Link>
          </li>
          <li className="text-xs sm:text-sm md:text-base lg:text-lg">
            <Link to="/profile" className="flex items-center">
              {currentUser.avatar ? (
                <img
                  className="rounded-full h-10 w-10 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 object-cover border-2 border-gray-300"
                  src={currentUser.avatar}
                  alt={`${currentUser.userName}'s avatar`}
                />
              ) : (
                <span className="hover:text-blue-500 transition duration-300 ease-in-out">
                  Sign In
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
