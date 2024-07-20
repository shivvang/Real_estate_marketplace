import PropertyListing from "../models/popertyListing.model.js";
import { errorHandler } from "../utils/error.js";

export const postProperty = async (req, res, next) => {
  const {
    propertyTitle,
    description,
    location,
    landmark,
    transactionType,
    propertyType,
    ownershipType,
    baths,
    beds,
    priceBreakUp,
    maintenanceCharge,
    carpetArea,
    propertyImageUrls,
    propertyStatus,
    addAreaDetails,
    accommodationDuration,
    priceDetails,
    amenities,
    userRefs,
  } = req.body;

  const errors = {};

  // Validate required fields
  if (!propertyTitle) errors.propertyTitle = "Property title is required.";
  if (!description) errors.description = "Description is required.";
  if (!location) errors.location = "Location is required.";
  if (!landmark) errors.landmark = "Landmark is required.";
  if (priceBreakUp <= 0)
    errors.priceBreakUp = "Price break-up must be greater than 0.";
  if (carpetArea <= 0)
    errors.carpetArea = "Carpet area must be greater than 0.";
  if (!propertyImageUrls || propertyImageUrls.length === 0)
    errors.propertyImageUrls = "At least one property image is required.";
  if (!userRefs) errors.userRefs = "User reference is required.";

  // Check for any validation errors
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    const property = await PropertyListing.create(req.body);
    return res.status(200).json({ success: true, property });
  } catch (error) {
    next(error);
  }
};

export const deleteProperties = async (req, res, next) => {
  const userCreatedProperty = await PropertyListing.findById(req.params.id);

  if (!userCreatedProperty) {
    return next(errorHandler(404, "there does not exist a property like this"));
  }

  if (req.user.id !== userCreatedProperty.userRefs) {
    return next(errorHandler(401, "cannot delete this"));
  }
  try {
    await PropertyListing.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted  property succsessfully ");
  } catch (error) {
    next(error);
  }
};

export const updateProperties = async (req, res, next) => {
  const {
    propertyTitle,
    description,
    location,
    landmark,
    transactionType,
    propertyType,
    ownershipType,
    baths,
    beds,
    priceBreakUp,
    maintenanceCharge,
    carpetArea,
    propertyImageUrls,
    propertyStatus,
    addAreaDetails,
    accommodationDuration,
    priceDetails,
    amenities,
    userRefs,
  } = req.body.formData;

  const errors = {};

  // Validate required fields
  if (!propertyTitle) errors.propertyTitle = "Property title is required.";
  if (!description) errors.description = "Description is required.";
  if (!location) errors.location = "Location is required.";
  if (!landmark) errors.landmark = "Landmark is required.";
  if (priceBreakUp <= 0)
    errors.priceBreakUp = "Price break-up must be greater than 0.";
  if (carpetArea <= 0)
    errors.carpetArea = "Carpet area must be greater than 0.";

  if (!propertyImageUrls || propertyImageUrls.length === 0)
    errors.propertyImageUrls = "At least one property image is required.";
  if (!userRefs) errors.userRefs = "User reference is required.";

  // Check for any validation errors
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const propertyalreadyexisting = await PropertyListing.findById(req.params.id);

  if (!propertyalreadyexisting) {
    return next(errorHandler(404, "There does not exist a property like this"));
  }

  if (req.user.id !== propertyalreadyexisting.userRefs) {
    return next(
      errorHandler(
        401,
        "Cannot update this because you are not the one who made this"
      )
    );
  }

  try {
    const updatedProperty = await PropertyListing.findByIdAndUpdate(
      req.params.id,
      req.body.formData,
      { new: true }
    );
    res.status(200).json(updatedProperty);
  } catch (error) {
    next(error);
  }
};

export const getProperty = async (req, res, next) => {
  try {
    const property = await PropertyListing.findById(req.params.id);
    if (!property) {
      return next(errorHandler(404, "property not found"));
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

const normalizeSearchTerm = (term) => {
  // Normalize spaces and handle cases without spaces
  const spacedTerm = term.trim().replace(/\s+/g, " ").toLowerCase();
  const termWithSpaces = spacedTerm.replace(/(\d+)([a-zA-Z]+)/g, "$1 $2"); // Add space between number and letters
  return termWithSpaces;
};

export const getPropertiesData = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let match = {};

    if (req.query.furnished === "true") {
      match.furnished = true;
    }

    if (req.query.parking === "true") {
      match.parking = true;
    }

    if (req.query.powerBackup === "true") {
      match["amenities.powerBackup"] = true;
    }

    if (req.query.lift === "true") {
      match["amenities.lift"] = true;
    }

    if (req.query.security === "true") {
      match["amenities.security"] = true;
    }

    if (req.query.waterSupply === "true") {
      match["amenities.waterSupply"] = true;
    }

    if (req.query.gymnasium === "true") {
      match["amenities.gymnasium"] = true;
    }

    if (req.query.swimmingPool === "true") {
      match["amenities.swimmingPool"] = true;
    }

    if (req.query.clubhouse === "true") {
      match["amenities.clubhouse"] = true;
    }

    if (req.query.garden === "true") {
      match["amenities.garden"] = true;
    }

    if (req.query.cctvSecurity === "true") {
      match["amenities.cctvSecurity"] = true;
    }

    let propertyType = req.query.propertyType;

    if (propertyType !== undefined && propertyType !== "all") {
      match.propertyType = propertyType;
    }

    let transactionType = req.query.transactionType;

    if (transactionType !== undefined && transactionType !== "all") {
      match.transactionType = transactionType;
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;
    console.log("sort", sort);
    console.log("order", order);

    const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

    if (searchTerm) {
      match.$or = [
        { propertyTitle: { $regex: normalizedSearchTerm, $options: "i" } },
        { description: { $regex: normalizedSearchTerm, $options: "i" } },
        { location: { $regex: normalizedSearchTerm, $options: "i" } },
      ];
    }

    const pipeline = [
      { $match: match },
      { $sort: { [sort]: order } },
      { $skip: startIndex },
      { $limit: limit },
    ];

    const dataReceived = await PropertyListing.aggregate(pipeline);

    return res.status(200).json(dataReceived);
  } catch (error) {
    next(error);
  }
};
