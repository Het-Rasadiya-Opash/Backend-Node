const express = require("express");
const app = express();

//mmiddleware
app.use((req, res, next) => {
  console.log("Middlware 1...");
  next();
});

//routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/profile", (req, res) => {
  res.send("Profile Page dddd");
});

app.get("/error", (req, res, next) => {
  return next(new Error("Something Error"));
});

//error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

//server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
