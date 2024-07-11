/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const ImageUpload = ({ formData, setFormData, uploading, setUploading }) => {
  const [imageUploadError, setImageUploadError] = useState(false);

  const [files, setFiles] = useState([]);
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length < 8) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImages(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            propertyImageUrls: formData.propertyImageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setImageUploadError(true);
          setUploading(false);
        });
    }
  };

  const storeImages = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(Math.round(progress));
        },
        (error) => {
          reject(error);
        },
        () => {
          //returns the download URL for the given StorageReference.
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <label className="font-semibold text-gray-300">
        Upload Property Images
      </label>
      <div className="flex items-center gap-4">
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="hidden"
        />
        <label
          htmlFor="images"
          className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-700 text-gray-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Upload
        </label>
        <button
          type="button"
          disabled={uploading}
          className={`p-4 bg-blue-600 rounded-lg text-white uppercase ${
            uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          } transition-opacity duration-200 ease-in-out`}
          onClick={handleImageSubmit}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {uploading && (
        <p className="text-gray-300 text-sm">Uploading images...</p>
      )}
      {imageUploadError && (
        <p className="text-red-700 text-sm">Error occurred while uploading</p>
      )}
    </div>
  );
};

export default ImageUpload;
