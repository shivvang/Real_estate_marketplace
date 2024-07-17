const userReviewSchema = new mongoose.Schema({
  reviewText: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyListing",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const UserReview = mongoose.model("UserReview", userReviewSchema);
export default UserReview;
