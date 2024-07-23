// routes/lastVisitedRoutes.js
import express from "express";
import {
  logVisited,
  visitedProperties,
} from "../controllers/LastVisitedProperty.controller.js";

const router = express.Router();

// Log visited property
router.post("/logVisited", logVisited);

// Fetch last visited properties for a user
router.get("/getVisited/:userId", visitedProperties);

export default router;
