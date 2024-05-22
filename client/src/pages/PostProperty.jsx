import React, { useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
function PostProperty() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(formData);
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
            imageUrls: formData.imageUrls.concat(urls),
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
  const handleRemoveImageUploaded = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-semibold text-center text-gray-800 my-7">
        Post Property
      </h1>
      <form className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            id="name"
            maxLength="100"
            minLength="10"
            required
          />
          <textarea
            placeholder="Description"
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            id="address"
            required
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                className="accent-green-700"
              />
              <span className="text-gray-700">Parking</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="accent-green-700"
              />
              <span className="text-gray-700">Furnished</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="balcony"
                className="accent-green-700"
              />
              <span className="text-gray-700">Balcony</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="TransactionType"
                className="accent-green-700"
              />
              <p className="text-gray-700">Sale</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="TransactionType"
                className="accent-green-700"
              />
              <p className="text-gray-700">Rent</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                className="p-4 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="number"
                id="baths"
                min="1"
                max="12"
                required
              />
              <p className="text-gray-700">Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-4 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="number"
                id="beds"
                min="1"
                max="12"
                required
              />
              <p className="text-gray-700">Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-4 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="number"
                id="priceBreakUp"
                required
              />
              <p className="text-gray-700">Price Break up</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-4 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="number"
                id="carpetArea"
                required
              />
              <p className="text-gray-700">Carpet Area</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold text-gray-700">Upload Images</p>
          <div className="flex gap-4">
            <input
              className="p-4 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              disabled={uploading}
              className="p-4 text-white bg-green-700 rounded-lg uppercase hover:opacity-90 transition-opacity duration-200 ease-in-out"
              onClick={handleImageSubmit}
            >
              {uploading ? "uploading....." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm mt-2">
            {imageUploadError ? "Error occurred while uploading" : ""}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border border-gray-300 rounded-lg items-center mb-2 shadow-md bg-white"
              >
                <img
                  src={url}
                  alt="property image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImageUploaded(index)}
                  className="p-3 text-red-700 border border-red-700 rounded-lg uppercase hover:bg-red-700 hover:text-white transition duration-200"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            type="submit"
            className="p-4 bg-green-700 text-white rounded-lg uppercase hover:opacity-90 transition-opacity duration-200 ease-in-out"
          >
            Create Property Post
          </button>
        </div>
      </form>
    </main>
  );
}

export default PostProperty;
