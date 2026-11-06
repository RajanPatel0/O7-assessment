import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authMiddleware from "./middlewares/authMiddleware.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import reportRoute from "./routes/reportRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(authMiddleware);
app.use("/auth", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/reports", reportRoute);

const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongodb connected");

    app.listen(PORT, () => {
      console.log("Server running on port:", PORT);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });