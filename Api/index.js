import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDb from "./db/index.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import propertyListing from "./routes/propertyListing.routes.js";
import UserReview from "./models/userReview.model.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
connectDb()
  .then(() => {
    app.on("error", (err) => {
      console.log("errr", err);
      throw err;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongo db connection failed !!", err);
  });

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/propertyListing", propertyListing);
app.use("/api/userReview", UserReview);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
