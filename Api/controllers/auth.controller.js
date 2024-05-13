import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  //check if fields are empty
  if ([email, userName, password].some((field) => field?.trim() === "")) {
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credential"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true, secure: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
