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
