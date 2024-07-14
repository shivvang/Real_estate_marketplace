import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://hips.hearstapps.com/hmg-prod/images/robert-downey-jr-attends-the-96th-oscars-nominees-luncheon-news-photo-1708713684.jpg",
    },
    role: {
      type: String,
      enum: ["buyer", " seller", "tenant"],
      default: "buyer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
