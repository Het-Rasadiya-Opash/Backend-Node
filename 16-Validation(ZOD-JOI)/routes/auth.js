import express from "express";
import { postRegister } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", postRegister);

export default router;
