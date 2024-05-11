import React from "react";
import { Link } from "react-router-dom";
function SignUp() {
  return (
    <div className="max-w-lg mx-auto bg-gray-900 rounded-lg shadow-lg p-6 mt-14">
      <h1 className="text-3xl text-center font-semibold text-white mb-6">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border-2 border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400"
          id="password"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 disabled:opacity-80"
        >
          Sign Up
        </button>
      </form>
      <div className="flex justify-center mt-5">
        <p className="text-gray-600">Already have an Account?</p>
        <Link to={"/signin"} className="ml-1">
          <span className="text-blue-700 hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
