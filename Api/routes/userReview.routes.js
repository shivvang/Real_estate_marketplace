import { Router } from "express";
import {
  getUserReview,
  postUserReview,
} from "../controllers/userReview.controller.js";
import { validateReview } from "../middleware/validateReview.js";

const router = Router();

router.post("/postReview", postUserReview);
router.get("/getReview/:propertyId", validateReview, getUserReview);
export default router;
