// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../firebase";
import {
  updatingUserbegin,
  updateUserSuccess,
  updateUserFailed,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  signOutStart,
  signOutFailed,
  signOutSuccess,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const FileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({ ...currentUser });
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = useCallback((file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
      },
      (error) => {
        setFileError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            avatar: downloadURL,
          }));
        });
      }
    );
  }, []);

  const handleInputChanges = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    },
    [formData]
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updatingUserbegin());
      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailed(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(updateUserSuccess(data));
      toast.success("User details updated successfully");
    } catch (error) {
      dispatch(updateUserFailed(error.message));
      toast.error(error.message);
    }
  };

  const handleDeletionOfUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/users/delete/${currentUser._id}`, {
        method: "delete",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailed(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success("Account deleted successfully");
    } catch (error) {
      dispatch(deleteUserFailed(error.message));
      toast.error(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailed(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(signOutSuccess(data));
      toast.success("Signed out successfully");
    } catch (error) {
      dispatch(signOutFailed(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-800 p-8 max-w-2xl mx-auto shadow-xl rounded-lg mt-14">
      <ToastContainer />
      <h1 className="text-4xl font-semibold text-center text-white mb-8">
        User Profile
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
        <div className="self-center mb-6">
          <input
            type="file"
            ref={FileRef}
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            onClick={() => FileRef.current.click()}
            src={file ? URL.createObjectURL(file) : currentUser.avatar}
            alt="profile"
            className="rounded-full h-40 w-40 object-cover cursor-pointer border-4 border-blue-500"
          />
          <p className="text-sm self-center mt-4 text-gray-300">
            {fileError ? (
              <span className="text-red-700 font-semibold">
                Error in image upload
              </span>
            ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
              <span className="text-blue-700">{`Uploading ${uploadPercentage}%`}</span>
            ) : uploadPercentage === 100 ? (
              <span className="text-green-700 font-semibold">
                Image successfully uploaded
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
        <input
          type="text"
          placeholder="Username"
          id="userName"
          className="border border-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-700 text-white placeholder-gray-400"
          defaultValue={currentUser.userName}
          onChange={handleInputChanges}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border border-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-700 text-white placeholder-gray-400"
          defaultValue={currentUser.email}
          onChange={handleInputChanges}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border border-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-700 text-white placeholder-gray-400"
          onChange={handleInputChanges}
        />
        <button
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-3 uppercase hover:opacity-95 transition duration-300 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        {currentUser.role === "seller" && (
          <Link
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg uppercase text-center hover:opacity-90 transition-opacity duration-200 ease-in-out shadow-md hover:shadow-lg"
            to={"/postproperty"}
          >
            Post Property
          </Link>
        )}
      </form>
      <div className="flex justify-between mt-6">
        <span
          onClick={handleDeletionOfUser}
          className="text-red-500 cursor-pointer hover:underline"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-500 cursor-pointer hover:underline"
        >
          Sign Out
        </span>
      </div>
      {error && <p className="text-red-700 mt-5 text-center">{error}</p>}

      {currentUser.role === "seller" && (
        <Link
          to="/PropertyList"
          className="bg-blue-500 text-white py-3 px-6 rounded-lg uppercase text-center hover:bg-blue-400 transition duration-300 ease-in-out flex justify-center mt-6"
        >
          Show User Properties
        </Link>
      )}
    </div>
  );
};

export default Profile;
