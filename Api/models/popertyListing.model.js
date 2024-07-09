import mongoose from "mongoose";

const propertyListingSchema = new mongoose.Schema(
  {
    propertyType: {
      type: String,
      enum: ["residential", "commercial", "rawLand"],
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["sell", "rent", "pg"],
      required: true,
    },

    priceBreakUp: {
      type: Number,
      required: true,
    },
    negotiable: {
      type: Boolean,
      required: true,
    },

    maintenanceCharge: {
      type: Number,
    },
    baths: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    carpetArea: {
      type: Number,
      required: true,
    },

    propertyStatus: {
      type: String,
      required: true,
    },
    propertyImageUrls: {
      type: Array,
      required: true,
    },
    ownershipType: {
      type: String,
      required: true,
    },
    addAreaDetails: {
      furnished: {
        type: Boolean,
        default: true,
      },
      balcony: {
        type: Boolean,
        default: true,
      },
      parking: {
        type: Boolean,
        default: true,
      },
    },
    amenities: {
      powerBackup: {
        type: Boolean,
        default: true,
      },
      lift: {
        type: Boolean,
        default: true,
      },
      security: {
        type: Boolean,
        default: false,
      },
      waterSupply: {
        type: Boolean,
        default: true,
      },
      gymnasium: {
        type: Boolean,
        default: false,
      },
      swimmingPool: {
        type: Boolean,
        default: false,
      },
      clubhouse: {
        type: Boolean,
        default: false,
      },
      garden: {
        type: Boolean,
        default: false,
      },
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
