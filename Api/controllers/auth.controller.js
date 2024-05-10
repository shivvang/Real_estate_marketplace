import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  //check if fields are empty
  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    errorHandler(401, "all fields are supposed to be filled");
  }

  //check if the  user already exist in db
  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

  if (existingUser) {
    errorHandler(401, "you already have an account login instead");
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  res.status(200).json({ user });
};
