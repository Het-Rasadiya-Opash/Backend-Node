const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./routes/userRoutes");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is Running");
});
