// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../../components/Oauth";
import { ValidateSignUpData } from "./ValidateSignUpdata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoleSelection from "../../components/RoleSelection";

function SignUp() {
  const [formData, setFormData] = useState({ role: "buyer" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = ValidateSignUpData(formData);
    if (Object.keys(errors).length > 0) {
      // Displaying errors using toast notifications
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      } else {
        // Clearing  error state if there exist no error
        setError("");
        // Navigate to the sign-in page
        navigate("/signin");
      }
    } catch (error) {
      // Check if the error is a network error
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 rounded-lg shadow-lg p-6 mt-14">
      <h1 className="text-3xl text-center font-semibold text-white mb-6">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border-2 border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400"
          id="userName"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400"
          id="password"
          onChange={handleChange}
        />
        <RoleSelection
          handleRoleChange={handleRoleChange}
          selectedRole={formData.role}
          uniqueKey="signUp"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <Oauth />
      </form>
      <div className="flex justify-center mt-5">
        <p className="text-gray-600">Already have an Account?</p>
        <Link to={"/signin"} className="ml-1">
          <span className="text-blue-700 hover:underline">Sign in</span>
        </Link>
        <ToastContainer />
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default SignUp;
