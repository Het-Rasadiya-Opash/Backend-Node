import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";
import postModel from "../models/postModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  const { username, password, email, role } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All Fields Requiredd" });
  }
  try {
    const existAuth = await authModel.findOne({ email });
    if (existAuth) {
      return res.status(400).json({ message: "Already Auth Registered..." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newAuth = await authModel.create({
      username,
      email,
      password: hashPassword,
      role,
    });

    const token = jwt.sign(
      { authId: newAuth._id, email: newAuth.email, role: newAuth.role },
      process.env.JWT,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "Auth Registered Successfully...",
      newAuth,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All Fields Requiredd" });
  }
  try {
    const existAuth = await authModel.findOne({ email });
    if (!existAuth) {
      return res.status(400).json({ message: "AAuth not found..." });
    }
    const isMatch = await bcrypt.compare(password, existAuth.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials..." });
    }
    const token = jwt.sign(
      { authId: existAuth._id, email: existAuth.email, role: existAuth.role },
      process.env.JWT,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "Auth Loggedin...",
      user: {
        authId: existAuth._id,
        email: existAuth.email,
        role: existAuth.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const post = await postModel.create({ title, content });
    res.status(200).json({ message: "Post Created..." });
  } catch (error) {
    next(error);
  }
};

export const getAllPost = async (req, res, next) => {
  try {
    const posts = await postModel.find();
    res.status(200).json({ message: "All Posts Fetchs...", posts });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
