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
import NumberInput from "./NumberInput";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import FileInput from "./FileInput";

function PostProperty() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    propertyTitle: "",
    description: "",
    location: "",
    landmark: "",
    transactionType: "sell",
    propertyType: "residential",
    ownershipType: "ownedbyme",

    baths: 1,
    beds: 1,
    priceBreakUp: 0,
    maintenanceCharge: 0,
    negotiable: false,
    carpetArea: 0,
    propertyImageUrls: [],
    propertyStatus: "",
    addAreaDetails: {
      parking: false,
      furnished: false,
      balcony: false,
    },
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
    userRefs: "",
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
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const [field, subfield] = name.split(".");

      if (subfield) {
        setFormData((prevData) => ({
          ...prevData,
          [field]: {
            ...prevData[field],
            [subfield]: checked,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      }
    } else if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
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
  return (
    <main className="p-6 max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-md mt-6">
      <h1 className="text-4xl font-semibold text-center text-white my-7">
        Begin Posting Your Property
      </h1>
      <form
        onSubmit={handleFormSubmission}
        className="flex flex-col sm:flex-row gap-6"
      >
        <div className="flex flex-col gap-4 flex-1">
          <TextInput
            placeholder="Property Title"
            name="propertyTitle"
            value={formData.propertyTitle}
            onChange={handleFormSubmission}
          />
          <TextArea
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleFormSubmission}
          />
          <TextInput
            placeholder="Location of the Property"
            name="location"
            value={formData.location}
            onChange={handleFormSubmission}
          />
          <TextInput
            placeholder="Land Mark of the Property"
            name="landmark"
            value={formData.landmark}
            onChange={handleFormSubmission}
          />
          <RadioGroup
            label="You're Looking To"
            name="transactionType"
            options={[
              { label: "Sell", value: "sell" },
              { label: "Rent/Lease", value: "rent" },
              { label: "PG", value: "pg" },
            ]}
            selectedOption={formData.transactionType}
            onChange={handleFormSubmission}
          />
          <RadioGroup
            label="And it's a ...."
            name="propertyType"
            options={[
              { label: "Residential", value: "residential" },
              {
                label: "Commercial",
                value: "commercial",
                disabled: formData.transactionType === "pg",
              },
            ]}
            selectedOption={formData.propertyType}
            onChange={handleFormSubmission}
          />
          <RadioGroup
            label="You Are..."
            name="ownershipType"
            options={[
              { label: "Owned By Me", value: "ownedbyme" },
              { label: "Broker", value: "broker" },
            ]}
            selectedOption={formData.ownershipType}
            onChange={handleFormSubmission}
          />
          <CheckboxGroup
            label="Add Area Details"
            name="addAreaDetails"
            options={[
              { label: "Balcony", value: "balcony" },
              { label: "Furnished", value: "furnished" },
              { label: "Parking", value: "parking" },
            ]}
            selectedOptions={formData.addAreaDetails}
            onChange={handleFormSubmission}
          />
          <CheckboxGroup
            label="Amenities"
            name="amenities"
            options={[
              { label: "Power Backup", value: "powerBackup" },
              { label: "Lift", value: "lift" },
              { label: "Security", value: "security" },
              { label: "Water Supply", value: "waterSupply" },
              { label: "Gymnasium", value: "gymnasium" },
              { label: "Swimming Pool", value: "swimmingPool" },
              { label: "Clubhouse", value: "clubhouse" },
              { label: "Garden", value: "garden" },
            ]}
            selectedOptions={formData.amenities}
            onChange={handleFormSubmission}
          />
          <div className="flex flex-wrap gap-6">
            <NumberInput
              label="Baths"
              name="baths"
              value={formData.baths}
              onChange={handleFormSubmission}
              min="1"
              max="12"
            />
            <NumberInput
              label="Beds"
              name="beds"
              value={formData.beds}
              onChange={handleFormSubmission}
              min="1"
              max="12"
            />
            <NumberInput
              label="Price Break-Up"
              name="priceBreakUp"
              value={formData.priceBreakUp}
              onChange={handleFormSubmission}
              min="0"
            />
            <NumberInput
              label="Carpet Area"
              name="carpetArea"
              value={formData.carpetArea}
              onChange={handleFormSubmission}
              min="0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 flex-1">
          <FileInput
            label="Upload Property Images"
            name="propertyImageUrls"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                propertyImageUrls: Array.from(e.target.files).map((file) =>
                  URL.createObjectURL(file)
                ),
              }))
            }
          />
        </div>
      </form>
    </main>
  );
}

export default PostProperty;
