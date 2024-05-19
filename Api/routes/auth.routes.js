import express from "express";
import {
  googleController,
  signin,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleOauth", googleController);
export default router;
