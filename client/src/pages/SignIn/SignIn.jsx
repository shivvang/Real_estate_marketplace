// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailed,
} from "../../redux/user/userSlice";
import Oauth from "../../components/Oauth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateSignInData } from "./validateSignInData";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSignInData(formData);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data._id) {
        dispatch(signInFailed(data.message));
        toast.error(data.message); // Use toast to show API error
      } else {
        dispatch(signInSuccess(data));
        toast.success("Sign in successful!"); // Success message
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailed(error.message));
      toast.error("An error occurred: " + error.message); // Use toast to show network error
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 rounded-lg shadow-lg p-6 mt-14">
      <h1 className="text-3xl text-center font-semibold text-white mb-6">
        Sign In
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <Oauth dontDispalythisInSignIn={true} />
      </form>
      <div className="flex justify-center mt-5">
        <p className="text-gray-600">Don&apos;t have an account?</p>
        <Link to={"/signup"} className="ml-1">
          <span className="text-blue-700 hover:underline">Sign up</span>
        </Link>
        <ToastContainer />
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default SignIn;
