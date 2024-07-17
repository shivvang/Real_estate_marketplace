const propertyCommentSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyListing",
    required: true,
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      commentText: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const PropertyCommentSection = mongoose.model(
  "PropertyCommentSection",
  propertyCommentSchema
);

export default PropertyCommentSection;
