import PropertyListing from "../models/popertyListing.model.js";
import { errorHandler } from "../utils/error.js";

export const postProperty = async (req, res, next) => {
  try {
    const properrty = await PropertyListing.create(req.body);
    return res.status(200).json(properrty);
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
    return next(
      errorHandler(
        401,
        "cannot delete this cause youre not the one who made this"
      )
    );
  }
  try {
    await PropertyListing.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted  property succsessfully ");
  } catch (error) {
    next(error);
  }
};

export const updateProperties = async (req, res, next) => {
  const propertyalreadyexisting = await PropertyListing.findById(req.params.id);

  if (!propertyalreadyexisting) {
    return next(errorHandler(404, "there does not exist a property like this"));
  }

  if (req.user.id !== propertyalreadyexisting.userRefs) {
    return next(
      errorHandler(
        401,
        "cannot update this cause youre not the one who made this"
      )
    );
  }
  try {
    const updatedProperty = await PropertyListing.findByIdAndUpdate(
      req.params.id,
      req.body,
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

export const getPropertiesData = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let furnished = req.query.furnished;

    //MongoDB query. The $in operator is used to match values of a field against an array of possible values
    if (furnished === undefined || furnished === false) {
      furnished = { $in: [false, true] };
    } else {
      furnished = furnished === "true";
    }

    let parking = req.query.Parking;

    if (parking === undefined || parking === false) {
      parking = { $in: [false, true] };
    } else {
      parking = parking === "true";
    }

    let propertyType = req.query.propertyType;

    if (propertyType === undefined || propertyType === "all") {
      propertyType = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || " ";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    // Log the filters to debug
    console.log({
      name: { $regex: searchTerm, $options: "i" },
      furnished,
      parking,
      propertyType,
    });

    // $regex MongoDB operator that allows you to perform regular expression (regex) searches. Regular expressions are a powerful way to search for patterns in strings.
    //$options: "i":This specifies options for the regex search. The "i" option stands for case-insensitive matching. It means that the search will match the pattern regardless of whether the characters are in uppercase or lowercase.
    const dataReceivied = await PropertyListing.find({
      name: { $regex: searchTerm, $options: "i" },
      furnished,
      parking,
      propertyType,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(dataReceivied);
  } catch (error) {
    next(error);
  }
};
