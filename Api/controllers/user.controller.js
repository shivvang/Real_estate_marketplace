import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import bcryptJs from "bcryptjs";

export const updateUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, "you can only make updates on your account birooo")
    );
  try {
    //updated password got in req from user profile component
    if (req.body.password) {
      req.body.password = bcryptJs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
        //By default, findOneAndUpdate() returns the document as it was before update was applied. If you set new: true,
        // findOneAndUpdate() will instead give you the object after update was applied.
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, "you cannot delete somebodies else's account")
    );
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};
