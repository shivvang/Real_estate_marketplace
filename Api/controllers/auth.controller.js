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

export const googleController = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      //doing this because there is no password provided by google auth ,in their response and in our user db password is required so...now this
      const createdPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(createdPassword, 10);
      const newUser = new User({
        //user name in db is unique so this is why this
        userName:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.userAvatar,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("user has been logged out");
  } catch (error) {
    next(error);
  }
};
