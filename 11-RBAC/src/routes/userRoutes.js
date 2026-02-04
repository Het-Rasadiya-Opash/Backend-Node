const express = require("express");
const verfiyToken = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddleware");
const router = express.Router();

//admin access router
router.get("/admin", verfiyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

//admin & manager
router.get(
  "/manager",
  verfiyToken,
  authorizeRole("admin", "manager"),
  (req, res) => {
    res.json({ message: "Welcome Manager" });
  },
);

// all can access
router.get(
  "/user",
  verfiyToken,
  authorizeRole("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "Welcome User" });
  },
);

module.exports = router;
