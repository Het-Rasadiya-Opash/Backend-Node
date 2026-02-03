const userModel = require("../models/user");
const postModel = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getRegister = (req, res) => {
  res.render("index");
};

exports.register = async (req, res) => {
  const { name, username, email, password, age } = req.body;
  const user = await userModel.findOne({ email });
  if (user) return res.status(500).send("User already Registered..");
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hashPassword) => {
      const user = await userModel.create({
        name,
        username,
        email,
        password: hashPassword,
        age,
      });
      const token = jwt.sign({ email, userid: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    });
  });
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return res.send("Something Went Wrong");
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email, userid: user._id },  process.env.JWT_SECRET);
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else {
      res.redirect("/login");
    }
  });
};

exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
};

exports.createPost = async (req, res) => {
  const { content } = req.body;
  let user = await userModel.findOne({ email: req.user.email });
  let post = await postModel.create({
    user: user._id,
    content,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
};

exports.getEdit = async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
};

exports.editPost = async (req, res) => {
  const { content } = req.body;
  const post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content },
    { new: true },
  );
  res.redirect("/profile");
};

exports.profile = async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");
  res.render("profile", { user });
};

exports.like = async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  await post.save();
  res.redirect("/profile");
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  const deletedPost = await postModel.findOneAndDelete({ _id: postId });
  if (!deletedPost) {
    return res.send("Post Not Found");
  }
  const user = await userModel.findOne({ _id: deletedPost.user });
  if (user) {
    await userModel.updateOne({ _id: user._id }, { $pull: { posts: postId } });
  }
  res.redirect("/profile");
};

exports.getProfileUpload = (req, res) => {
  res.render("profileUpload");
};

exports.uploadProfilePic = async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  
  user.profilePic = req.file.filename;
  await user.save();
  res.redirect("/profile");
};
