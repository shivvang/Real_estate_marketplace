import mongoose from "mongoose";

const propertyListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    priceBreakUp: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    carpetArea: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    balcony: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },

    TransactionType: {
      type: String,
      required: true,
    },
    propertyImageUrls: {
      type: Array,
      required: true,
    },
    userRefs: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PropertyListing = mongoose.model(
  "PropertyListing",
  propertyListingSchema
);

export default PropertyListing;
