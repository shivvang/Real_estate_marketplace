import express from "express";
import {
  logContact,
  getContactLogs,
} from "../controllers/ContactLog.controller.js";

const router = express.Router();

// Log contact
router.post("/logContact", logContact);

// Get contact logs for a user
router.get("/getContacts/:userId", getContactLogs);

export default router;
