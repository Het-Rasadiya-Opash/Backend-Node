import express from "express";
import { upload } from "../middlewares/multer.js";
import { register } from "../controllers/user.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([{ name: "pic", maxCount: 1 }]),
  register,
);

export default router;
