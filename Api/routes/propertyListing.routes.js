import express from "express";
import {
  deleteProperties,
  postProperty,
} from "../controllers/propertyListing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/postProperty", verifyToken, postProperty);

router.delete("/delete/:id", verifyToken, deleteProperties);
export default router;
