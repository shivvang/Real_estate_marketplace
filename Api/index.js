import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./db/index.js";
import userRouter from "./routes/user.routes.js";
const app = express();

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

app.use("/api/users", userRouter);
