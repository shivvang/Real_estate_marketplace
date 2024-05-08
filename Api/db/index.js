import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const DB_NAME = "mernKun";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_CONNECTION_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDb connected [[DB HOST : ${connectionInstance.connection.host}]]`
    );
  } catch (error) {
    console.log(`error encountered is ${error}`);
    process.exit(1);
  }
};
export default connectDb;
