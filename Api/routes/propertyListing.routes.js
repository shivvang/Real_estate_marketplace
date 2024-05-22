import express from "express";
import { postProperty } from "../controllers/propertyListing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/postProperty", verifyToken, postProperty);
export default router;
