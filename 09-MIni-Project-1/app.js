require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const path = require("path");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
