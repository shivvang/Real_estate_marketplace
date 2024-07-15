/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import RoleSelection from "./RoleSelection";
function Oauth({ dontDispalythisInSignIn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/googleOauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          userAvatar: result.user.photoURL,
          role,
        }),
      });

      const data = await res.json();

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in", error.message);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-4 ">
      {!dontDispalythisInSignIn && (
        <RoleSelection
          handleRoleChange={handleRoleChange}
          selectedRole={role}
          uniqueKey="oauth"
        />
      )}

      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-white text-gray-800 py-3 px-6 rounded-lg uppercase hover:opacity-90 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center gap-2"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.9 0 7 1.3 9.3 3.4l6.9-6.9C36.2 2.1 30.5 0 24 0 14.9 0 7.4 5.1 4 12.5l7.9 6.2C13.4 12 18.2 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.5 24c0-1.8-.2-3.5-.6-5.2H24v9.8h12.7c-.6 3.2-2.5 5.9-5.2 7.8l7.9 6.2C43.3 37.2 46.5 31 46.5 24z"
          />
          <path
            fill="#4A90E2"
            d="M12.1 28.5c-1.1-.6-2.1-1.3-2.9-2.1l-7.9 6.2C5.7 37.6 12.7 42 21 42c5.4 0 10-1.8 13.3-4.9l-7.9-6.2c-2.1 1.5-4.8 2.5-7.7 2.5-3.4 0-6.5-1.1-9-3.1z"
          />
          <path
            fill="#FBBC05"
            d="M12.1 28.5c-1.1-.6-2.1-1.3-2.9-2.1l-7.9 6.2C5.7 37.6 12.7 42 21 42c5.4 0 10-1.8 13.3-4.9l-7.9-6.2c-2.1 1.5-4.8 2.5-7.7 2.5-3.4 0-6.5-1.1-9-3.1z"
          />
        </svg>
        Continue with Google
      </button>
    </div>
  );
}

export default Oauth;
