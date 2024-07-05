import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          Housing<span className="text-gray-400">.Com</span>
        </Link>

        <form onSubmit={handleFormSubmission} className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-800 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-600 px-4 py-2 rounded-r-lg flex items-center">
            <FaSearch className="text-white text-lg" />
          </button>
        </form>
        <ul className="hidden md:flex items-center gap-4 lg:gap-6">
          <li className="text-sm">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
          </li>
          <li className="text-sm">
            <Link to="/PropertyList" className="hover:text-blue-500">
              PropertyList
            </Link>
          </li>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-sm hover:text-blue-500">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default NavBar;
