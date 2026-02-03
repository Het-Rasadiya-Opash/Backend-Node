const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Mongodb");
});

app.get("/create", async (req, res) => {
  const createdUser = await userModel.create({
    name: "user",
    username: "user",
    email: "user@gmail.com",
  });
  res.send(createdUser);
});

app.get("/read", async (req, res) => {
  const user = await userModel.find();
  //   const user = await userModel.find({ username: "het_01" }); // return a Array
  //   const user = await userModel.findOne({ username: "het_01" }); // return a Object
  res.send(user);
});

app.get("/update", async (req, res) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { username: "het_01" },
    { name: "Het Rasadiya" },
    { new: true },
  );
  res.send(updatedUser);
});

app.get("/delete", async (req, res) => {
  const deletedUser = await userModel.findOneAndDelete({ username: "het_01" });
  res.send(deletedUser);
});

app.listen(3000, () => {
  console.log("Server is Running");
});
