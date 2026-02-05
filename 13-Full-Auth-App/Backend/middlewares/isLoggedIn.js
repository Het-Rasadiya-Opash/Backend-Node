import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token && token === "") {
    return res.status(401).json({ message: "No token. Please authenticate." });
  }
  try {
    const data = jwt.verify(token, process.env.JWT);
    req.user = data;
    next();
  } catch (err) {
    next(err);
  }
};
