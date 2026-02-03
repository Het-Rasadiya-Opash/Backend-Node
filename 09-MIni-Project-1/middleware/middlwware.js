const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  if (req.cookies.token === "") {
    res.redirect("/login");
  }
  try {
    let data = jwt.verify(req.cookies.token,  process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};
module.exports = isLoggedIn;
