const jwt = require("jsonwebtoken");

// const verfiyToken = (req, res, next) => {
//   let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "No Token, authorization Denied" });
//     }
//     try {
//       const decode = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decode;
//       console.log("Decoded user :", req.user);
//       next();
//     } catch (error) {
//       res.status(400).json({ message: "Token Not valid" });
//     }
//   } else {
//     return res.status(401).json({ message: "No Token, authorization Denied" });
//   }
// };

const verfiyToken = (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No Token, authorization Denied" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ message: "No Token, authorization Denied" });
  }
};

module.exports = verfiyToken;
