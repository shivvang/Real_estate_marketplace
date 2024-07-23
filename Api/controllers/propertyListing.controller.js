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
    return next(errorHandler(404, "This does not exist "));
  }

  if (req.user.id !== propertyalreadyexisting.userRefs) {
    return next(errorHandler(401, "Cannot update this"));
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

//Normalized Search Term: Normalize the cleaned search term that doesn't contain the price ,space ,uppercase stuff.
const normalizeSearchTerm = (term) => {
  const spacedTerm = term.trim().replace(/\s+/g, " ").toLowerCase();
  const termWithSpaces = spacedTerm.replace(/(\d+)([a-zA-Z]+)/g, "$1 $2");
  return termWithSpaces;
};

//This  is designed to take a price input string (like "2cr" or "50 lakh"), clean it, and convert it into a numeric value.
const parsePriceInput = (input) => {
  if (!input) return null;
  const cleanInput = input.replace(/[^0-9.]/g, "");
  let number = parseFloat(cleanInput);
  if (input.toLowerCase().includes("cr")) {
    number *= 10000000;
  } else if (input.toLowerCase().includes("lakh")) {
    number *= 100000;
  }
  return isNaN(number) ? null : number;
};

// designed to take a full search term that might include a price component (like "3cr apartment in Mumbai") and extract the price part of the search term.
const extractPriceFromSearchTerm = (searchTerm) => {
  const pricePattern = /(\d+(\.\d+)?\s*(cr|lakh))/i;
  const match = searchTerm.match(pricePattern);
  if (match) {
    return parsePriceInput(match[0]);
  }
  return null;
};

//o remove any price-related components from a search term string
const removePriceComponentFromSearchTerm = (searchTerm) => {
  return searchTerm.replace(/(\d+(\.\d+)?\s*(cr|lakh))/i, "").trim();
};

export const getPropertiesData = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let match = {};

    const addAreaDetails = ["furnished", "balcony", "parking"];
    addAreaDetails.forEach((areadDetail) => {
      if (req.query[areadDetail] === "true") {
        match[`addAreaDetails.${areadDetail}`] = true;
      }
    });

    const amenities = [
      "furnished",
      "parking",
      "powerBackup",
      "lift",
      "security",
      "waterSupply",
      "gymnasium",
      "swimmingPool",
      "clubhouse",
      "garden",
      "cctvSecurity",
    ];
    amenities.forEach((amenity) => {
      if (req.query[amenity] === "true") {
        match[`amenities.${amenity}`] = true;
      }
    });

    const propertyType = req.query.propertyType;
    if (propertyType && propertyType !== "all") {
      match.propertyType = propertyType;
    }

    const transactionType = req.query.transactionType;
    if (transactionType && transactionType !== "all") {
      match.transactionType = transactionType;
    }

    const ownershipType = req.query.ownershipType;
    if (ownershipType) {
      match.ownershipType = ownershipType;
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    let price = extractPriceFromSearchTerm(searchTerm);
    if (price !== null) {
      match.priceBreakUp = { $gte: price };
    }

    const cleanedSearchTerm = removePriceComponentFromSearchTerm(searchTerm);
    const normalizedSearchTerm = normalizeSearchTerm(cleanedSearchTerm);

    if (normalizedSearchTerm) {
      match.$or = [
        { propertyTitle: { $regex: normalizedSearchTerm, $options: "i" } },
        { description: { $regex: normalizedSearchTerm, $options: "i" } },
        { location: { $regex: normalizedSearchTerm, $options: "i" } },
      ];
    }

    const { minPrice, maxPrice } = req.query;

    if (minPrice || maxPrice) {
      const min = parsePriceInput(minPrice);
      const max = parsePriceInput(maxPrice);

      if (!match.priceBreakUp) match.priceBreakUp = {};

      if (min !== null) match.priceBreakUp.$gte = min;
      if (max !== null) match.priceBreakUp.$lte = max;
    }
    //search term containing the price component is being used to match fields like propertyTitle, description, and location,
    const pipeline = [
      { $match: match },
      { $sort: { [sort]: order } },
      { $skip: startIndex },
      { $limit: limit },
    ];

    //console.log("Query match object:", JSON.stringify(match, null, 2));

    const dataReceived = await PropertyListing.aggregate(pipeline);

    return res.status(200).json(dataReceived);
  } catch (error) {
    next(error);
  }
};
