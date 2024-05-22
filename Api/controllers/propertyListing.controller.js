import PropertyListing from "../models/popertyListing.model.js";

export const postProperty = async (req, res, next) => {
  try {
    const properrty = await PropertyListing.create(req.body);
    return res.status(200).json(properrty);
  } catch (error) {
    next(error);
  }
};
