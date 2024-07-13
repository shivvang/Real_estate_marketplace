import mongoose from "mongoose";

const propertyListingSchema = new mongoose.Schema(
  {
    propertyType: {
      type: String,
      enum: ["residential", "commercial", "rawLand"],
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
    },

    priceBreakUp: {
      type: Number,
      required: true,
    },

    maintenanceCharge: {
      type: Number,
    },
    accommodationDuration: {
      type: Number,
      min: 0,
      max: 24,
    },
    baths: {
      type: Number,

      min: 1,
      max: 12,
    },
    beds: {
      type: Number,
      min: 1,
      max: 12,
    },
    carpetArea: {
      type: Number,
      required: true,
    },
    priceDetails: {
      isNegotiable: {
        type: Boolean,
        required: true,
      },
      additionalCharges: {
        type: Boolean,
      },
    },
    propertyStatus: {
      type: String,
      enum: ["readyToMoveIn", "underConstruction", "upcoming"],
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
      cctvSecturity: {
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
