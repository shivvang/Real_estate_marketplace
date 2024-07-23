import mongoose from "mongoose";

const lastVisitedPropertySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyListing",
    required: true,
  },
  visitedAt: { type: Date, default: Date.now },
});

const LastVisitedProperty = mongoose.model(
  "LastVisitedProperty",
  lastVisitedPropertySchema
);
export default LastVisitedProperty;
