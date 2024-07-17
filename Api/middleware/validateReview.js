import { body, validationResult } from "express-validator";

// Middleware for validating input
export const validateReview = [
  body("reviewText")
    .isString()
    .notEmpty()
    .withMessage("Review text is required"),
  body("userId").isMongoId().withMessage("Invalid user ID"),
  body("propertyId").isMongoId().withMessage("Invalid property ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
