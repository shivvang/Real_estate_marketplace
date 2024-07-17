import UserReview from "../models/userReview.model";
import PropertyListing from "../models/popertyListing.model.js";
import PropertyCommentSection from "../models/propetyComment.model";
export const postUserReview = async (req, res, next) => {
  try {
    const { reviewText, userId, propertyId } = req.body;

    // Creating  a new review
    const review = await UserReview.create({ reviewText, userId, propertyId });

    // Checking  if the already property exists
    const property = await PropertyListing.findById(propertyId);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    // Finding  the comment section for the property or create a new one
    let commentSection = await PropertyCommentSection.findOne({ propertyId });

    if (!commentSection) {
      commentSection = await PropertyCommentSection.create({
        propertyId,
        comments: [],
      });
    }

    // Adding  new comment to the comment section
    commentSection.comments.push({
      userId,
      commentText: reviewText,
    });

    await commentSection.save();

    return res.status(200).json({ success: true, review, commentSection });
  } catch (error) {
    next(error);
  }
};

export const getUserReview = async (req, res, next) => {
  const { propertyId } = req.params;

  // Find the current properties comment section
  const commentSection = await PropertyCommentSection.findOne({ propertyId })
    .populate("comments.userId", "userName") // Populate the userId field with user name or other details
    .exec();

  if (!commentSection) {
    return res.status(404).json({
      success: false,
      message: "No comments found for this property",
    });
  }

  return res
    .status(200)
    .json({ success: true, comments: commentSection.comments });
  try {
  } catch (error) {
    next(error);
  }
};
