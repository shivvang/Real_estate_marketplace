import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const FileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(FormData);
  console.log(uploadPercentage);
  console.log(fileError);
  //firebase storage
  //allow read;
  //allow write: if
  //request.resource.size<100 *1024 * 1024 &&
  //request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    //  StorageReference where data should be uploaded.
    const storageRef = ref(storage, fileName);
    //Uploads data to this object's location. The upload can be paused and resumed, and exposes progress updates.
    const uploadTask = uploadBytesResumable(storageRef, file);

    //fire base documentation

    //   uploadTask.on('state_changed',
    // (snapshot) => {
    //   // Observe state change events such as progress, pause, and resume
    //   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   console.log('Upload is ' + progress + '% done');

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
        //returns the download URL for the given StorageReference.
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  return (
    <div className="bg-gray-900 p-6 max-w-lg mx-auto shadow-md rounded-lg mt-14">
      <h1 className="text-3xl font-semibold text-center text-white mb-6">
        Profile
      </h1>
      <form className="flex flex-col gap-6">
        <div className="self-center mb-4">
          <input
            type="file"
            ref={FileRef}
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            onClick={() => FileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-32 w-32 object-cover cursor-pointer border-2 border-gray-300"
          />
          <p className="text-sm self-center mt-4">
            {fileError ? (
              <span className="text-red-700 font-semibold">
                Error in image Upload
              </span>
            ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
              <span className="text-blue-700">{`uploading ${uploadPercentage}%`}</span>
            ) : uploadPercentage === 100 ? (
              <span className="text-green-700 font-semibold">
                Image succesfully uploaded
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
          className="border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400"
        />
        <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg p-3 uppercase hover:opacity-95 transition duration-300 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-6">
        <span className="text-red-600 cursor-pointer hover:underline">
          Delete Account
        </span>
        <span className="text-red-600 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
