const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/product");
dotenv.config();
const app = express();
const connectDB = require("./db/connect");
const cors = require("cors");

const PORT = process.env.PORT;
connectDB();

app.use(
  cors({
    origin: "*",
  }),
);

app.use("/api/products", router);

app.use((err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
