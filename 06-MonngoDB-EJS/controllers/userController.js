const userModel = require("../models/user");

exports.get = (req, res) => {
  res.render("index");
};

exports.getAll = async (req, res) => {
  const allUsers = await userModel.find();
  res.render("read", { users: allUsers });
};

exports.createUser = async (req, res) => {
  const { name, email, img } = req.body;
  const createdUser = await userModel.create({ name, email, img });
  res.redirect("/user/read");
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await userModel.findByIdAndDelete(id);
  res.redirect("/user/read");
};

exports.getEditPage = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById(id);
  res.render("edit", { user });
};

exports.editUser = async (req, res) => {
  const { name, email, img } = req.body;
  const updatedUser = await userModel.findByIdAndUpdate(
    { _id: req.params.userid },
    { name, email, img },
    { new: true },
  );
  res.redirect("/user/read");
};
