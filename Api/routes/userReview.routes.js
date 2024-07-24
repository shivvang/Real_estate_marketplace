import { Router } from "express";
import {
  getUserReview,
  postUserReview,
} from "../controllers/userReview.controller.js";

const router = Router();

router.post("/postReview", postUserReview);
router.get("/getReview/:propertyId", getUserReview);
export default router;
