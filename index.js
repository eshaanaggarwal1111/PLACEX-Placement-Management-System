import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { UserRouter } from "./routes.js/user.js";
const app = express();
dotenv.config();
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true

}))
app.use(cookieParser())
app.use(express.json());
app.use("/auth", UserRouter);
mongoose.connect("mongodb://127.0.0.1:27017/PlaceX")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
    console.log("Please ensure MongoDB is installed and running on localhost:27017");
    console.log("You can install MongoDB from: https://www.mongodb.com/try/download/community");
  });
app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});
