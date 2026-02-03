const express = require("express");
const router = express.Router();
const {
  get,
  getAll,
  createUser,
  deleteUser,
  getEditPage,
  editUser,
} = require("../controllers/userController");

router.get("/", get);

router.get("/read", getAll);

router.post("/create", createUser);

router.get("/delete/:id", deleteUser);

router.get("/edit/:id", getEditPage);

router.post("/edit/:userid", editUser);

module.exports = router;
