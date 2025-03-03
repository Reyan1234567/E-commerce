import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config;
export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
  } catch (err) {
    console.log("mongodb coudn't connect");
    console.log(err);
  }
};
