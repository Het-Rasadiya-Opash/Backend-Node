const express = require("express");
const {
  getRegister,
  register,
  getLogin,
  logout,
  createPost,
  getEdit,
  editPost,
  profile,
  like,
  login,
  deletePost,
  getProfileUpload,
  uploadProfilePic,
} = require("../controllers/userController");
const isLoggedIn = require("../middleware/middlwware");
const router = express.Router();
const upload = require("../config/multerConfig");

router.get("/", getRegister);
router.post("/register", register);

router.get("/login", getLogin);
router.post("/login", login);

router.get("/logout", logout);

router.post("/post", isLoggedIn, createPost);
router.get("/edit/:id", getEdit);
router.post("/update/:id", editPost);

router.get("/profile", isLoggedIn, profile);
router.get("/like/:id", isLoggedIn, like);

router.get("/delete/:id", isLoggedIn, deletePost);

router.get("/profile/upload", getProfileUpload);

router.post("/upload", isLoggedIn, upload.single("img"), uploadProfilePic);

module.exports = router;
