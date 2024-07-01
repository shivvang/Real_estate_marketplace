import express from "express";
import {
  deleteProperties,
  getProperty,
  postProperty,
  updateProperties,
} from "../controllers/propertyListing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/postProperty", verifyToken, postProperty);
router.delete("/delete/:id", verifyToken, deleteProperties);
router.post("/update/:id", verifyToken, updateProperties);
router.get("/getProperty/:id", getProperty);

export default router;
