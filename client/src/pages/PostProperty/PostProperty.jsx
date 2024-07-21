// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NumberInput from "./NumberInput";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import ImageUpload from "./ImageUpload";
import DisplayUploadedImages from "./DisplayUploadedImages";
import validateFormData from "./validateFormData ";

function PostProperty() {
  const [uploading, setUploading] = useState(false);
  const formRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
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

    carpetArea: 0,
    propertyImageUrls: [],
    propertyStatus: "readyToMoveIn",
    addAreaDetails: {
      parking: false,
      furnished: false,
      balcony: false,
    },
    accommodationDuration: 0,
    priceDetails: {
      isNegotiable: false,
      additionalCharges: false,
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
      cctvSecturity: false,
    },
    userRefs: `${currentUser._id}`,
  });

  const [formsubmissionError, setFormSubmissionError] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const navigate = useNavigate();

  const allOptions = [
    { label: "Power Backup", value: "powerBackup" },
    { label: "High speed Eleveators", value: "lift" },
    { label: "24x7 Security", value: "security" },
    { label: "Water Supply", value: "waterSupply" },
    { label: "Gymnasium", value: "gymnasium" },
    { label: "Swimming Pool", value: "swimmingPool" },
    { label: "Clubhouse", value: "clubhouse" },
    { label: "Children's play Area", value: "garden" },
    { label: "CCTV Camera Security", value: "cctvSecturity" },
  ];

  const filterOptionsByPropertyType = (propertyType) => {
    if (propertyType === "commercial") {
      return allOptions.filter(
        (option) =>
          !["gymnasium", "swimmingPool", "clubhouse", "garden"].includes(
            option.value
          )
      );
    }
    return allOptions;
  };

  const conditionalOptionsAreaDetails = [
    ...(formData.propertyType !== "commercial"
      ? [{ label: "Balcony", value: "balcony" }]
      : []),
    { label: "Furnished", value: "furnished" },
    { label: "Parking", value: "parking" },
  ];
  const handleFormSubmission = (e) => {
    const { name, value, type, checked } = e.target;
    const [field, subfield] = name.split(".");

    if (type === "checkbox") {
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
      if (subfield) {
        setFormData((prevData) => ({
          ...prevData,
          [field]: {
            ...prevData[field],
            [subfield]: value,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const filteredOptions = filterOptionsByPropertyType(formData.propertyType);
  const onFormSubmission = async (e) => {
    e.preventDefault();
    // Validate form data
    const errors = validateFormData(formData);
    if (Object.keys(errors).length > 0) {
      // Displaying errors using toast notifications
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return;
    }

    try {
      setSubmissionLoading(true);
      setFormSubmissionError(false);
      const res = await fetch("/api/propertyListing/postProperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      setSubmissionLoading(false);

      if (data.success === false) {
        setFormSubmissionError(data.message);
      }

      navigate(`/propertyView/${data.property._id}`);
    } catch (error) {
      setFormSubmissionError(error.message);
      setSubmissionLoading(false);
    }
  };
  const getPlaceholderText = () => {
    if (formData.propertyType === "rawLand") {
      return "Please provide a detailed description of your land, including its features, location advantages, potential uses, and any other relevant details. Please specify the size of the land in acres.";
    }

    if (formData.propertyType === "residential") {
      return "Please specify the type of residential property (e.g., Apartment, Bungalow, Row House). Include details about any unique features not covered in the form.";
    }

    if (formData.propertyType === "commercial") {
      return "Please specify the type of commercial property (e.g., Office Building, Retail Store, Warehouse). Include details about layout, amenities, and any other relevant features.";
    }

    return "Describe your property...";
  };
  return (
    <main className="p-6 max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-md mt-6">
      <h1 className="text-4xl font-semibold text-center text-white my-7">
        Begin Posting Your Property
      </h1>
      <form
        id="propertyForm"
        onSubmit={onFormSubmission}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        ref={formRef}
      >
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <TextInput
            label="Property Title"
            name="propertyTitle"
            placeholder="Enter Property Title"
            value={formData.propertyTitle}
            onChange={handleFormSubmission}
          />
          <TextArea
            label="Description"
            name="description"
            placeholder={getPlaceholderText()}
            value={formData.description}
            onChange={handleFormSubmission}
          />
          <div className="flex gap-4">
            <TextInput
              label="Location"
              name="location"
              placeholder="Enter Location"
              value={formData.location}
              onChange={handleFormSubmission}
            />
            <TextInput
              label="Location Advantage"
              name="landmark"
              placeholder="Enter Location Advantage"
              value={formData.landmark}
              onChange={handleFormSubmission}
            />
          </div>
          <RadioGroup
            label="Transaction Type"
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
            label="Property Type"
            name="propertyType"
            options={[
              { label: "Residential", value: "residential" },
              {
                label: "Commercial",
                value: "commercial",
              },
              {
                label: "Raw Plot",
                value: "rawLand",
                disabled:
                  formData.transactionType === "pg" ||
                  formData.transactionType === "rent",
              },
            ]}
            selectedOption={formData.propertyType}
            onChange={handleFormSubmission}
          />
          {formData.propertyType !== "rawLand" && (
            <RadioGroup
              label="Property Status"
              name="propertyStatus"
              options={[
                { label: "Ready to Move In", value: "readyToMoveIn" },
                { label: "Under Construction", value: "underConstruction" },
                { label: "Upcoming", value: "upcoming" },
              ]}
              selectedOption={formData.propertyStatus}
              onChange={handleFormSubmission}
            />
          )}
          <RadioGroup
            label="Ownership Type"
            name="ownershipType"
            options={[
              { label: "Owned By Me", value: "ownedbyme" },
              { label: "Broker", value: "broker" },
            ]}
            selectedOption={formData.ownershipType}
            onChange={handleFormSubmission}
          />
        </div>
        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <CheckboxGroup
            label="Price Details"
            name="priceDetails"
            options={[
              { label: "Negotiable Price", value: "isNegotiable" },
              {
                label: "Additional Charges",
                value: "additionalCharges",
                disabled: formData.propertyType === "rawLand",
              },
            ]}
            selectedOptions={formData.priceDetails}
            onChange={handleFormSubmission}
          />
          {formData.propertyType !== "rawLand" && (
            <CheckboxGroup
              label="Area Details"
              name="addAreaDetails"
              options={conditionalOptionsAreaDetails}
              selectedOptions={formData.addAreaDetails}
              onChange={handleFormSubmission}
            />
          )}
          {formData.propertyType !== "rawLand" && (
            <CheckboxGroup
              label="Amenities"
              name="amenities"
              options={filteredOptions}
              selectedOptions={formData.amenities}
              onChange={handleFormSubmission}
            />
          )}
          {formData.propertyType !== "rawLand" &&
            formData.propertyType !== "commercial" && (
              <div className="flex gap-4">
                <NumberInput
                  label="Number of Baths"
                  name="baths"
                  value={formData.baths}
                  onChange={handleFormSubmission}
                  min="1"
                  max="12"
                />
                <NumberInput
                  label="Number of Beds"
                  name="beds"
                  value={formData.beds}
                  onChange={handleFormSubmission}
                  min="1"
                  max="12"
                />
              </div>
            )}
          {formData.priceDetails.additionalCharges && (
            <NumberInput
              label={`Maintenance Charge ${
                formData.transactionType === "rent" ||
                formData.transactionType === "pg"
                  ? "/Month"
                  : ""
              } `}
              name="maintenanceCharge"
              value={formData.maintenanceCharge}
              onChange={handleFormSubmission}
              min="0"
            />
          )}
          <NumberInput
            label={`Starting Price  ${
              formData.transactionType === "rent" ||
              formData.transactionType === "pg"
                ? "/Month"
                : ""
            } `}
            name="priceBreakUp"
            value={formData.priceBreakUp}
            onChange={handleFormSubmission}
            min="0"
          />
          {formData.transactionType === "rent" ||
          formData.transactionType === "pg" ? (
            <NumberInput
              label={
                formData.transactionType === "rent"
                  ? "Expected Duration of Stay (months)"
                  : "Monthly Staying Tenure (months)"
              }
              name="accommodationDuration"
              value={formData.accommodationDuration}
              onChange={handleFormSubmission}
              min={0}
              max={24}
            />
          ) : null}

          <NumberInput
            label={`${
              formData.propertyType === "rawLand"
                ? "Land Area (in sq ft)"
                : "Carpet Area (in sq ft)"
            }`}
            name="carpetArea"
            value={formData.carpetArea}
            onChange={handleFormSubmission}
            min="0"
          />
        </div>
      </form>
      <div className="flex flex-col items-center gap-6 p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Upload Property Images
        </h2>
        <ImageUpload
          formData={formData}
          setFormData={setFormData}
          uploading={uploading}
          setUploading={setUploading}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <DisplayUploadedImages
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        <button
          disabled={uploading || submissionLoading}
          type="submit"
          className="mt-6 p-4 w-full sm:w-auto text-white bg-blue-600 rounded-lg uppercase hover:opacity-90 transition-opacity duration-200 ease-in-out"
          onClick={() => formRef.current.requestSubmit()}
        >
          {submissionLoading ? "Post Publishing..." : "Create Property Post"}
        </button>
        <ToastContainer />
        {formsubmissionError && (
          <p className="text-red-700 text-sm mt-2">{formsubmissionError}</p>
        )}
      </div>
    </main>
  );
}

export default PostProperty;
