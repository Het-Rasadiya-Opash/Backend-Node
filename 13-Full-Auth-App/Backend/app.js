import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/authRoute.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    withCredentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", router);

app.use((err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
