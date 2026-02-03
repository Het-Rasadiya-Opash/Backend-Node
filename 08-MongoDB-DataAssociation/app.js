const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("Data Association");
});

app.get("/create", async (req, res) => {
  const user = await userModel.create({
    username: "het",
    email: "het@gmail.com",
    age: 20,
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  const post = await postModel.create({
    postData: "post data",
    user: "69817d787865c2de0dcbf494",
  });
  const user = await userModel.findById("69817d787865c2de0dcbf494");
  user.posts.push(post._id);
  user.save();
  res.send(post);
});

app.listen(3000, () => {
  console.log("Server is Runing");
});
