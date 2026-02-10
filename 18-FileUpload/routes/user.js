import express from "express";
import { upload } from "../middlewares/multer.js";
import { deleteUser, register } from "../controllers/user.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([{ name: "pic", maxCount: 1 }]),
  register,
);

router.delete("/:id", deleteUser);

export default router;
