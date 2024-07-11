import express from "express";
import {
  updateProperties,
  deleteProperties,
  getPropertiesData,
  getProperty,
  postProperty,
} from "../controllers/propertyListing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/postProperty", verifyToken, postProperty);
router.delete("/delete/:id", verifyToken, deleteProperties);
router.post("/update/:id", verifyToken, updateProperties);
router.get("/getProperty/:id", getProperty);
router.get("/get", getPropertiesData);

export default router;
