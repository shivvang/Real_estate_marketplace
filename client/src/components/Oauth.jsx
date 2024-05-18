import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

function Oauth() {
  const handleGoogleCLick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          phot: result.user.photoURL,
        }),
      });

      const data = await res.json();
    } catch (error) {
      console.log("could not sign innnnnnn", error.message);
    }
  };
  return (
    <button
      onClick={handleGoogleCLick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      continue with google
    </button>
  );
}

export default Oauth;
