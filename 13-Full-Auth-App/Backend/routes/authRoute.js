import express from "express";
import { createPost, getAllPost, login, register, getMe, logout } from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { roleBaseAuth } from "../middlewares/roleBaseAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login" , login);

router.get("/me", isLoggedIn, getMe);

router.post("/logout", logout);

router.post("/post/create", isLoggedIn, roleBaseAuth("admin"), createPost);

router.get("/post/", isLoggedIn, roleBaseAuth("admin", "user"), getAllPost);

export default router;
