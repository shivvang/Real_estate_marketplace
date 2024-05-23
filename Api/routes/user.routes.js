import express from "express";
import {
  deleteUser,
  getUserCreatedProperty,
  updateUserInfo,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUserInfo);

router.delete("/delete/:id", verifyToken, deleteUser);

router.get("/postedProperty/:id", verifyToken, getUserCreatedProperty);
export default router;
