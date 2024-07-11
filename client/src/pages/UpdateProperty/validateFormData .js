const validateFormData = (formData) => {
  const errors = {};

  // Property Title Validation
  if (!formData.propertyTitle || formData.propertyTitle.trim() === "") {
    errors.propertyTitle = "Property title is required.";
  }

  // Description Validation
  if (!formData.description || formData.description.trim() === "") {
    errors.description = "Description is required.";
  }

  // Location Validation
  if (!formData.location || formData.location.trim() === "") {
    errors.location = "Location is required.";
  }

  // Landmark Validation
  if (!formData.landmark || formData.landmark.trim() === "") {
    errors.landmark = "Landmark is required.";
  }

  // Transaction Type Validation
  if (!["sell", "rent", "pg"].includes(formData.transactionType)) {
    errors.transactionType = "Invalid transaction type.";
  }

  // Property Type Validation
  if (
    !["residential", "commercial", "rawLand"].includes(formData.propertyType)
  ) {
    errors.propertyType = "Invalid property type.";
  }

  // Ownership Type Validation
  if (!["ownedbyme", "broker"].includes(formData.ownershipType)) {
    errors.ownershipType = "Invalid ownership type.";
  }

  // Baths Validation
  if (formData.baths < 1) {
    errors.baths = "The number of baths must be at least 1.";
  }

  // Beds Validation
  if (formData.beds < 1) {
    errors.beds = "The number of beds must be at least 1.";
  }

  // Price Breakup Validation
  if (formData.priceBreakUp < 0) {
    errors.priceBreakUp = "Price breakup cannot be negative.";
  }

  // Maintenance Charge Validation
  if (
    formData.priceDetails.additionalCharges &&
    formData.maintenanceCharge < 0
  ) {
    errors.maintenanceCharge = "Maintenance charge cannot be negative.";
  }

  // Carpet Area Validation
  if (formData.carpetArea <= 0) {
    errors.carpetArea = "Carpet area must be greater than 0.";
  }

  // Property Images Validation
  if (formData.propertyImageUrls.length === 0) {
    errors.propertyImageUrls = "At least one property image is required.";
  }

  // Property Status Validation
  if (
    !["readyToMoveIn", "underConstruction", "upcoming"].includes(
      formData.propertyStatus
    )
  ) {
    errors.propertyStatus = "Invalid property status.";
  }

  // Accommodation Duration Validation
  if (
    (formData.transactionType === "rent" ||
      formData.transactionType === "pg") &&
    formData.accommodationDuration < 1
  ) {
    errors.accommodationDuration =
      "Accommodation duration must be specified for rent or PG properties.";
  }

  // User Refs Validation
  if (!formData.userRefs || formData.userRefs.trim() === "") {
    errors.userRefs = "User reference is required.";
  }

  return errors;
};

export default validateFormData;
