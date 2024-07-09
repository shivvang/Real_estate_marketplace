import React, { useState } from "react";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostProperty() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    transactionType: "sell",
    propertyType: "residential",
    ownershipType: "ownedbyme",
    parking: false,
    furnished: false,
    balcony: false,
    baths: 1,
    beds: 1,
    priceBreakUp: 0,
    carpetArea: 0,
    propertyImageUrls: [],
    amenities: {
      powerBackup: true,
      lift: false,
      security: false,
      waterSupply: true,
      gymnasium: false,
      swimmingPool: false,
      clubhouse: false,
      garden: false,
    },
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formsubmissionError, setFormSubmissionError] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

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
  const handleRemoveImageUploaded = (index) => {
    setFormData({
      ...formData,
      propertyImageUrls: formData.propertyImageUrls.filter(
        (_, i) => i !== index
      ),
    });
  };
  const handleFormSubmission = (e) => {
    if (
      e.target.id === "sell" ||
      e.target.id === "rent" ||
      e.target.id === "pg"
    ) {
      setFormData({
        ...formData,
        transactionType: e.target.id,
      });
    }

    if (e.target.id === "residental" || e.target.id === "commercial") {
      setFormData({ ...formData, propertyType: e.target.id });
    }

    if (e.target.id === "ownedbyme" || e.target.id === "brooker") {
      setFormData({ ...formData, ownershipType: e.target.id });
    }

    if (e.target.id === "parking" || e.target.id === "furnished") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        //bracket is added to get the variable
        [e.target.id]: e.target.value,
      });
    }
  };

  console.log("formData", formData);
  const onfromSubmission = async (e) => {
    e.preventDefault();
    try {
      setSubmissionLoading(true);
      setFormSubmissionError(false);
      const res = await fetch("/api/propertyListing/postProperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRefs: currentUser._id }),
      });

      const data = await res.json();
      setSubmissionLoading(false);

      if (data.success === false) {
        setFormSubmissionError(false);
      }

      navigate(`/propertyView/${data._id}`);
    } catch (error) {
      setFormSubmissionError(error.message);
      setSubmissionLoading(false);
    }
  };
  return <div></div>;
}

export default PostProperty;
