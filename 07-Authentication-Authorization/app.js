require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  const { username, email, password, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      res.cookie("token", token);
      res.send(createdUser);
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.send("Something is wrong");
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email }, process.env.JWT_SECRET);
      res.cookie("token", token);
      res.send("You are Logged In");
    } else res.send("You can't login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Server Running on", process.env.PORT);
});
